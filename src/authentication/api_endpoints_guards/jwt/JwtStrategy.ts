import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUserDto } from './JwtUserDto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      // signOptions: {
      //   // expiresIn: configService.get<string | number>('JWT_EXPIRATION_TIME'),
      //   expiresIn: 30 * 60,
      //   issuer: 'https://www.netguru.com/',
      // },
    });
  }

  async validate(payload: any): Promise<JwtUserDto> {
    return { userId: payload.userId, name: payload.name, role: payload.role };
  }
}
