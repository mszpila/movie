import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenCreator } from './IAccessTokenCreator';

@Injectable()
export class JwtAccessTokenCreator implements AccessTokenCreator {
  private users = [
    {
      id: 123,
      role: 'basic',
      name: 'Basic Thomas',
      username: 'basic-thomas',
      password: 'sR-_pcoow-27-6PAwCD8',
    },
    {
      id: 434,
      role: 'premium',
      name: 'Premium Jim',
      username: 'premium-jim',
      password: 'GBLtTyq3E_UNjFnpo9m6',
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  public async getAccessToken(
    username: string,
    password: string,
  ): Promise<any> {
    const user = this.users.find((u) => u.username === username);

    if (!user || user.password !== password) {
      throw new BadRequestException('Wrong credentials');
    }
    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        userId: user.id,
        name: user.name,
        role: user.role,
      }),
    };
  }
}
