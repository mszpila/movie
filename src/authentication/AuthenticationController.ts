import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDto } from './domain/dto/LoginDto';
import { AccessTokenCreator } from './domain/IAccessTokenCreator';
import { JwtAccessTokenCreator } from './domain/JwtAccessTokenCreator';

@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject(JwtAccessTokenCreator)
    private accessTokenCreator: AccessTokenCreator,
  ) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<any> {
    return this.accessTokenCreator.getAccessToken(
      loginDto.username,
      loginDto.password,
    );
  }
}
