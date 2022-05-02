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
import { OwnersEntity } from '../../model/Owners.entity';
import { CreateOwnerDto } from '../owner/dto/create-owner.dto';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly jwtService: JwtService,
  ) {}
  login(dto: LoginDto) {
    return '';
  }

  registration(dto: LoginDto) {
    return '';
  }

  async registrationOwner(dto: CreateOwnerDto) {
    const candidate = await this.ownerService.getOwnerByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже есть',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hash = await bcrypt.hash(dto.password, 5);
    const owner = await this.ownerService.createOwner({
      ...dto,
      password: hash,
    });
    return this.generateTokensOwner(owner);
  }

  async generateTokensOwner(owner: OwnersEntity): Promise<TokensDto> {
    const payload = { id: owner.id, email: owner.email, role: 'owner' };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '30m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '30 days' }),
    };
  }
}
