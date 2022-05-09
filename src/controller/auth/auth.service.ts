import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { OwnerService } from '../owner/owner.service';
import { JwtService } from '@nestjs/jwt';
import { OwnerEntity } from '../../model/Owner.entity';
import { CreateOwnerDto } from '../owner/dto/create-owner.dto';
import { TokensDto } from './dto/tokens.dto';
import { CreateOrganizerDto } from '../organizer/dto/create-organizer.dto';
import { OrganizerService } from '../organizer/organizer.service';
import { OrganizerEntity } from '../../model/Organizer.entity';
import { Role } from '../../enum-types/enum.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly organizerService: OrganizerService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<TokensDto> {
    const owner = await this.ownerService.getOwnerByEmail(dto.email);
    const organizer = await this.organizerService.getOrganizerByEmail(
      dto.email,
    );
    if (owner || organizer) {
      let orgPassword, ownPassword;
      if (owner) {
        ownPassword = bcrypt.compareSync(dto.password, owner.password);
      } else {
        orgPassword = bcrypt.compareSync(dto.password, organizer.password);
      }
      if (owner && ownPassword) {
        return await this.generateTokensOwner(owner);
      } else if (organizer && orgPassword) {
        return await this.generateTokens(organizer);
      } else {
        throw new HttpException(
          'Неверный пароль или email',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        'Такого пользователя не существует',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async registration(dto: CreateOrganizerDto): Promise<TokensDto> {
    const candidate = await this.organizerService.getOrganizerByEmail(
      dto.email,
    );
    const ownerCandidate = await this.ownerService.getOwnerByEmail(dto.email);
    if (candidate || ownerCandidate) {
      throw new HttpException(
        'Пользователь с таким email уже есть',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hash = await bcrypt.hash(dto.password, 5);
    const user = await this.organizerService.createOrganizer({
      ...dto,
      password: hash,
    });
    return this.generateTokens(user);
  }

  async registrationOwner(dto: CreateOwnerDto): Promise<TokensDto> {
    const candidate = await this.ownerService.getOwnerByEmail(dto.email);
    const organizerCandidate = await this.organizerService.getOrganizerByEmail(
      dto.email,
    );
    if (candidate || organizerCandidate) {
      throw new HttpException(
        'Пользователь с таким email уже есть',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hash = await bcrypt.hash(dto.password, 5);
    const user = await this.ownerService.createOwner({
      ...dto,
      password: hash,
    });
    return this.generateTokensOwner(user);
  }

  async generateTokens(organizer: OrganizerEntity): Promise<TokensDto> {
    const payload = {
      id: organizer.id,
      email: organizer.email,
      role: Role.Organizer,
    };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '30m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '30 days' }),
    };
  }

  async generateTokensOwner(owner: OwnerEntity): Promise<TokensDto> {
    const payload = { id: owner.id, email: owner.email, role: Role.Owner };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '30m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '30 days' }),
    };
  }
}
