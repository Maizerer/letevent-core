import { Module } from '@nestjs/common';
import { FacilityController } from './facility.controller';
import { FacilityService } from './facility.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilitiesEntity } from '../../model/Facilities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FacilitiesEntity])],
  controllers: [FacilityController],
  providers: [FacilityService],
})
export class FacilityModule {}
