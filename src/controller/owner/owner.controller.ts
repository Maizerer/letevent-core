import { Body, Controller, Post } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('/create')
  create(@Body() createOwnerDto: CreateOwnerDto): Promise<CreateOwnerDto> {
    return this.ownerService.create(createOwnerDto);
  }
}
