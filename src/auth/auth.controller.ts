import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CalendarService } from 'src/calendar/calendar.service';
import { JwtService } from '@nestjs/jwt';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService,private calendarService: CalendarService, private jwtService: JwtService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}


  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req,/*  @Res() res: Response */) {
    const jwt:string = await this.authService.validateOAuthLogin(req.user);
    console.log("auth.controller.ts->jwt="+jwt)
    const payload = this.jwtService.verify(jwt.toString(), {
      secret: 'sgqfelix',
    });

    const result= await this.calendarService.getEvents(payload.user.accessToken);

   // res.json(result);
    return result;

  }
}
