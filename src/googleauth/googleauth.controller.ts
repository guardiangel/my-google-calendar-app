import { Controller, Get, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './googleauth.service';
import { JwtService } from '@nestjs/jwt';
import { google } from 'googleapis';
import { LoggingInterceptor } from '../interceptors/LoggingInterceptor';

@Controller("googleauth")
export class GoogleAuthController {
  constructor(private googleAuthService: GoogleAuthService, private jwtService: JwtService) {}

  @Get('login')
  googleLogin(@Req() req, @Res() res) {
    //console.log("req.params.customParam="+req.query.customParam)
    return res.redirect(`/googleauth/google/callback`);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(@Req() req) {
    console.log("googleAuth="+req);

  }


  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req,/*  @Res() res: Response */) {
    const jwt:string = await this.googleAuthService.validateOAuthLogin(req.user);
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
