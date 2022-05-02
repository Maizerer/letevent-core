import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOwnerDto } from '../owner/dto/create-owner.dto';
import { TokensDto } from './dto/tokens.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Регистрация организатора' })
  @Post('/registration')
  registration(@Body() dto: RegistrationDto) {
    return this.authService.registration(dto);
  }

  @ApiOperation({ summary: 'Регистрация арендодателя' })
  @ApiResponse({ type: TokensDto, status: 201 })
  @Post('/owner/registration')
  async ownerRegistration(@Body() dto: CreateOwnerDto): Promise<TokensDto> {
    return await this.authService.registrationOwner(dto);
  }
}
