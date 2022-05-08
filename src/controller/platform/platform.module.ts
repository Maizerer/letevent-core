import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformEntity } from '../../model/Platform.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlatformEntity])],
  controllers: [PlatformController],
  providers: [PlatformService],
})
export class PlatformModule {}
