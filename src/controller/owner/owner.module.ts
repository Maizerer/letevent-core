import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersEntity } from '../../model/Owners.entity';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OwnersEntity])],
  providers: [OwnerService],
  controllers: [OwnerController],
  exports: [],
})
export class OwnerModule {}
