import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { OwnerModule } from './controller/owner/owner.module';
import { AuthModule } from './controller/auth/auth.module';
import { OrganizerModule } from './controller/organizer/organizer.module';
import { FacilityModule } from './controller/facility/facility.module';
import { FileModule } from './controller/file/file.module';
import { MulterModule } from '@nestjs/platform-express';
import { PlatformModule } from './controller/platform/platform.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    MulterModule.register({
      dest: './uploads',
    }),
    OwnerModule,
    AuthModule,
    OrganizerModule,
    FacilityModule,
    FileModule,
    PlatformModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
