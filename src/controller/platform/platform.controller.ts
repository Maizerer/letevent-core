import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
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
import { Request } from 'express';

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
  @ApiOperation({ summary: 'Получить площадку' })
  @ApiResponse({ type: PlatformEntity, status: 200 })
  @Get('/:id')
  async getPlatformById(@Param('id') platformId): Promise<PlatformEntity> {
    return await this.platformService.getPlatformById(platformId);
  }

  @ApiOperation({ summary: 'Удаление площадки (в корзину)' })
  @ApiResponse({ type: PlatformEntity, status: 200 })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Owner)
  @Post('/delete/:id')
  async deletePlatform(
    @Param('id') platformId,
    @Req() request,
  ): Promise<PlatformEntity> {
    return await this.platformService.changeDeleteStatus(
      platformId,
      request.user,
      true,
    );
  }

  @ApiOperation({ summary: 'Восстановление площадки' })
  @ApiResponse({ type: PlatformEntity, status: 200 })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Owner)
  @Post('/restore/:id')
  async restorePlatform(
    @Param('id') platformId,
    @Req() request,
  ): Promise<PlatformEntity> {
    return await this.platformService.changeDeleteStatus(
      platformId,
      request.user,
      false,
    );
  }

  @ApiOperation({ summary: 'Удаление площадки полностью' })
  @ApiResponse({ type: PlatformEntity, status: 200 })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Owner)
  @Delete('/:id')
  async totalDeletePlatform(
    @Param('id') platformId,
    @Req() request,
  ): Promise<PlatformEntity> {
    return await this.platformService.totalDeletePlatform(
      platformId,
      request.user,
    );
  }
}
