import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformEntity } from '../../model/Platform.entity';
import { TokenUserDto } from './dto/token-user.dto';
import { OwnerService } from '../owner/owner.service';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { handleError } from '../auth/jwt-auth.guard';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(PlatformEntity) private repo: Repository<PlatformEntity>,
    private jwtService: JwtService,
    private ownerService: OwnerService,
  ) {}

  handleNotFoundError(e) {
    if (e.constructor === EntityNotFoundError) {
      throw new HttpException('Площадка не найдена', HttpStatus.NOT_FOUND);
    } else throw e;
  }

  async createPlatform(
    file: Express.Multer.File,
    dto: CreatePlatformDto,
    user: TokenUserDto,
  ): Promise<PlatformEntity> {
    const folderName = file.destination.replace('.', '');
    const fileName = folderName + '/' + file.filename;
    const owner = await this.ownerService.getOwnerByEmail(user.email);
    return await this.repo.save({ ...dto, mainImg: fileName, owner: owner });
  }

  async changeDeleteStatus(
    platformId: number,
    user: TokenUserDto,
    deleteStatus: boolean,
  ) {
    try {
      const platform = await this.repo.findOneOrFail(platformId, {
        relations: ['owner'],
        loadRelationIds: true,
      });
      if (platform.owner === user.id) {
        platform.isDeleted = deleteStatus;
        return await this.repo.save(platform);
      }
      handleError(new HttpException('Нет доступа', HttpStatus.FORBIDDEN));
    } catch (e) {
      this.handleNotFoundError(e);
    }
  }

  async totalDeletePlatform(platformId: number, user: TokenUserDto) {
    try {
      const platform = await this.repo.findOneOrFail(platformId, {
        relations: ['owner'],
        loadRelationIds: true,
      });
      if (platform.owner === user.id) {
        return await this.repo.remove(platform);
      }
      handleError(new HttpException('Нет доступа', HttpStatus.FORBIDDEN));
    } catch (e) {
      this.handleNotFoundError(e);
    }
  }

  async getPlatformById(platformId) {
    try {
      return await await this.repo.findOneOrFail(platformId);
    } catch (e) {}
  }
}
