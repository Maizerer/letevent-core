import { Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';

@Injectable()
export class FacilityService {
  async createFacility(file: Express.Multer.File, body: CreateFacilityDto) {
    return '';
  }
}
