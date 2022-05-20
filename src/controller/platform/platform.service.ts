import { Injectable } from '@nestjs/common';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformEntity } from '../../model/Platform.entity';
import { TokenUserDto } from './dto/token-user.dto';
import { OwnerService } from '../owner/owner.service';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(PlatformEntity) private repo: Repository<PlatformEntity>,
    private ownerService: OwnerService,
  ) {}
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
}
