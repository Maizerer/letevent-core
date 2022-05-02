import { Module } from '@nestjs/common';
import { OwnerModule } from '../owner/owner.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OrganizerModule } from '../organizer/organizer.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    OwnerModule,
    OrganizerModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretary',
    }),
  ],
})
export class AuthModule {}
