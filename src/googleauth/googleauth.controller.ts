import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './googleauth.service';
import { JwtService } from '@nestjs/jwt';
import { google } from 'googleapis';

@Controller("googleauth")
export class GoogleAuthController {
  constructor(private googleAuthService: GoogleAuthService, private jwtService: JwtService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}


  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req,/*  @Res() res: Response */) {
    const jwt:string = await this.googleAuthService.validateOAuthLogin(req.user);
    console.log("auth.controller.ts->jwt="+jwt)
    const payload = this.jwtService.verify(jwt.toString(), {
      secret: 'sgqfelix',
    });

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: payload.user.accessToken });

    const calendar = google.calendar({ version: 'v3', auth });

    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const result= res.data.items;

   // res.json(result);
    return result;

  }
}
