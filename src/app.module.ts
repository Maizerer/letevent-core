import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { OwnerModule } from './controller/owner/owner.module';
import { AuthModule } from './controller/auth/auth.module';
import { OrganizerModule } from './controller/organizer/organizer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    OwnerModule,
    AuthModule,
    OrganizerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
