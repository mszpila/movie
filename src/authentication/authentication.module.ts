import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessTokenCreator } from './domain/JwtAccessTokenCreator';
import { AccessTokenCreator } from './domain/IAccessTokenCreator';
import { JwtStrategy } from './api_endpoints_guards';
import { AuthenticationController } from './AuthenticationController';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          // expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
          expiresIn: 30 * 60,
          issuer: 'https://www.netguru.com/',
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [JwtAccessTokenCreator, JwtStrategy],
  exports: [JwtAccessTokenCreator],
})
export class AuthenticationModule {}
