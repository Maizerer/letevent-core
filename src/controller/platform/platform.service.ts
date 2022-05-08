import { Injectable } from '@nestjs/common';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformEntity } from '../../model/Platform.entity';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(PlatformEntity) private repo: Repository<PlatformEntity>,
  ) {}
  async createPlatform(
    file: Express.Multer.File,
    dto: CreatePlatformDto,
  ): Promise<PlatformEntity> {
    const folderName = file.destination.replace('.', '');
    const fileName = folderName + '/' + file.filename;
    return await this.repo.save({ ...dto, mainImg: fileName });
  }
}
