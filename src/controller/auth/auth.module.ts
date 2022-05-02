import { Module } from '@nestjs/common';
import { OwnerModule } from '../owner/owner.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    OwnerModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretary',
    }),
  ],
})
export class AuthModule {}
