import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOwnerDto } from '../owner/dto/create-owner.dto';
import { TokensDto } from './dto/tokens.dto';
import { CreateOrganizerDto } from '../organizer/dto/create-organizer.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Авторизация пользователя (организатор и арендодатель)',
  })
  @ApiResponse({ type: TokensDto, status: 200 })
  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Регистрация организатора' })
  @ApiResponse({ type: TokensDto, status: 201 })
  @Post('/registration')
  registration(@Body() dto: CreateOrganizerDto) {
    return this.authService.registration(dto);
  }

  @ApiOperation({ summary: 'Регистрация арендодателя' })
  @ApiResponse({ type: TokensDto, status: 201 })
  @Post('/owner/registration')
  async ownerRegistration(@Body() dto: CreateOwnerDto): Promise<TokensDto> {
    return await this.authService.registrationOwner(dto);
  }
}
