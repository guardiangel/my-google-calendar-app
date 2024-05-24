import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    console.log("jwt-auth.guard.ts->token",token)
    if (!token) {
      return false;
    }

    const payload = this.jwtService.verify(token, {
      secret: 'sgqfelix',
    });
    console.log("payload",payload)
    request.user = payload.user;
    return true;
  }
}
