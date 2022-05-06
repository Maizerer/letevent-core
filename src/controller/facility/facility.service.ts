import { Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { Repository } from 'typeorm';
import { FacilitiesEntity } from '../../model/Facilities.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(FacilitiesEntity)
    private repo: Repository<FacilitiesEntity>,
  ) {}
  async createFacility(
    file: Express.Multer.File,
    body: CreateFacilityDto,
  ): Promise<FacilitiesEntity> {
    const folderName = file.destination.replace('.', '');
    const fileName = folderName + '/' + file.filename;
    return await this.repo.save({ ...body, src: fileName });
  }
}
