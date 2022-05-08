import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { FacilityService } from './facility.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../utils/file-upload';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FacilitiesEntity } from '../../model/Facilities.entity';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { DeleteResult } from 'typeorm';

@ApiTags('Удобства')
@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @ApiOperation({ summary: 'Создание удобства' })
  @ApiResponse({ type: FacilitiesEntity, status: 201 })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({
    name: 'file',
    required: true,
    description: 'Иконка удобства',
  })
  @ApiImplicitBody({
    name: 'name',
    required: true,
    description: 'Название удобства',
    content: undefined,
    type: String,
  })
  @Post('/create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createFacility(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateFacilityDto,
  ): Promise<FacilitiesEntity> {
    return await this.facilityService.createFacility(file, body);
  }

  @ApiOperation({ summary: 'Удаление удобства по Id' })
  @ApiResponse({ type: FacilitiesEntity, status: 200 })
  @Delete('/:id')
  async deleteFacility(@Param('id') facilityId): Promise<FacilitiesEntity> {
    return await this.facilityService.deleteFacility(facilityId);
  }
}
