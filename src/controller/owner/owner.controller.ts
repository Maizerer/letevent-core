import { Body, Controller, Post } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { OwnerService } from './owner.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OwnerEntity } from '../../model/Owners.entity';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Создание арендодателя' })
  @ApiResponse({ status: 201, type: OwnerEntity })
  create(@Body() createOwnerDto: CreateOwnerDto): Promise<CreateOwnerDto> {
    return this.ownerService.createOwner(createOwnerDto);
  }
}
