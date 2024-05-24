import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateOAuthLogin(user: any): Promise<string> {
    console.log("auth.service.ts->user:", user)
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret: 'sgqfelix',
    });
  }
}
