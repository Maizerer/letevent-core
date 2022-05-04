import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { FacilityService } from './facility.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createFacility(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateFacilityDto,
  ) {
    return await this.facilityService.createFacility(file, body);
  }
}
