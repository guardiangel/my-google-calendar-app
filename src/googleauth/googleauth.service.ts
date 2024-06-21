import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleAuthService {
  constructor(private jwtService: JwtService) {}

  async validateOAuthLogin(user: any): Promise<string> {
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret: 'sgqfelix',
    });
  }
}
