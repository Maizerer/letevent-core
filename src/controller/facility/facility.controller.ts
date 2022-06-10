import {
  Body,
  Controller,
  Delete,
  Get,
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
import { FacilityEntity } from '../../model/Facility.entity';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { ResponseMessage } from '../../enum-types/enum.type';

@ApiTags('Удобства')
@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @ApiOperation({ summary: 'Создание удобства' })
  @ApiResponse({ type: FacilityEntity, status: 201 })
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
  ): Promise<FacilityEntity> {
    return await this.facilityService.createFacility(file, body);
  }

  @ApiOperation({ summary: 'Удаление удобства по Id' })
  @ApiResponse({ type: FacilityEntity, status: 200 })
  @Delete('/:id')
  async deleteFacility(@Param('id') facilityId): Promise<ResponseMessage> {
    return await this.facilityService.deleteFacility(facilityId);
  }

  @ApiOperation({ summary: 'Получение всех удобств' })
  @ApiResponse({ type: FacilityEntity, status: 200, isArray: true })
  @Get('/get-all')
  async getAll(): Promise<FacilityEntity[]> {
    return await this.facilityService.getAll();
  }
}
