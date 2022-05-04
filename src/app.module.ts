import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { OwnerModule } from './controller/owner/owner.module';
import { AuthModule } from './controller/auth/auth.module';
import { OrganizerModule } from './controller/organizer/organizer.module';
import { JwtModule } from '@nestjs/jwt';
import { FacilityModule } from './controller/facility/facility.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    OwnerModule,
    AuthModule,
    OrganizerModule,
    FacilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
