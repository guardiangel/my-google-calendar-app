import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { google } from 'googleapis';

@Controller('googleauth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @Redirect()
  async googleAuth() {
    console.log("auth.conroller.ts********")
    const url = this.authService.getAuthUrl();
    return { url };
  }

  @Get('google/callback')
  async googleAuthCallback(@Query('code') code: string) {
    const tokens = await this.authService.getToken(code);
    console.log("token***********", tokens)
    return tokens;
  }

  @Get("refreshToken")
  async refreshToken() {
    const tokens = await this.authService.refreshToken();
    console.log("second token ***********", tokens)

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token:tokens.access_token });

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
