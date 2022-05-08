import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { Repository } from 'typeorm';
import { FacilityEntity } from '../../model/Facility.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(FacilityEntity)
    private repo: Repository<FacilityEntity>,
  ) {}
  async createFacility(
    file: Express.Multer.File,
    body: CreateFacilityDto,
  ): Promise<FacilityEntity> {
    console.log(file);
    const folderName = file.destination.replace('.', '');
    const fileName = folderName + '/' + file.filename;
    return await this.repo.save({ ...body, src: fileName });
  }

  async deleteFacility(facilityId: number): Promise<FacilityEntity> {
    const facility = await this.repo.findOneOrFail(facilityId);
    if (!facility) {
      throw new HttpException('Удобство не найдено', HttpStatus.NOT_FOUND);
    }
    const deletedFacility = await this.repo.remove(facility);
    if (!deletedFacility) {
      throw new HttpException(
        'Не удалось удалить удобство',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return deletedFacility;
  }
}
