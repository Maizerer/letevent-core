import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { PlatformController } from './platform/platform.controller';
import { PlatformService } from './platform/platform.service';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig())],
  controllers: [AppController, PlatformController],
  providers: [AppService, PlatformService],
})
export class AppModule {}
