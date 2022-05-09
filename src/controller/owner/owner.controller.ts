import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllOwners() {
    return await this.ownerService.getAllOwners();
  }
}
