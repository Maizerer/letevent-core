import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformEntity } from '../../model/Platform.entity';
import { AuthModule } from '../auth/auth.module';
import { OwnerModule } from '../owner/owner.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlatformEntity]),
    AuthModule,
    OwnerModule,
  ],
  controllers: [PlatformController],
  providers: [PlatformService],
})
export class PlatformModule {}
