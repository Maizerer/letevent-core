import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    console.log(file);
    const folderName = file.destination.replace('.', '');
    const fileName = folderName + '/' + file.filename;
    return await this.repo.save({ ...body, src: fileName });
  }

  async deleteFacility(facilityId: number): Promise<FacilitiesEntity> {
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
