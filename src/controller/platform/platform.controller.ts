import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PlatformService } from './platform.service';
import { CreatePlatformDto } from './dto/create-platform.dto';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { PlatformEntity } from '../../model/Platform.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../utils/file-upload';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../../utils/role.decorator';
import { Role } from '../../enum-types/enum.type';

@ApiTags('Площадка')
@Controller('platform')
export class PlatformController {
  constructor(private platformService: PlatformService) {}

  @ApiOperation({ summary: 'Создание площадки' })
  @ApiResponse({ type: PlatformEntity, status: 201 })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({
    name: 'file',
    description: 'Главное фото площадки',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/platforms',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
    ClassSerializerInterceptor,
  )
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Owner)
  @Post('/create')
  async createPlatform(
    @Req() request,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreatePlatformDto,
  ): Promise<PlatformEntity> {
    return await this.platformService.createPlatform(file, dto, request.user);
  }
}
