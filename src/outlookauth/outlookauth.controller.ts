import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { OutAuthLookService } from './outlookauth.service';

//http://localhost:4000/outlook/login

@Controller('outlook')
export class OutLookController {
  constructor( private readonly outAuthLookService: OutAuthLookService) {}

  @Get('login')
  async getCalendarEvents(@Req() req, @Res() res) {
    //return this.outLookService.getCode();
    const authUrl = await this.outAuthLookService.getAuthUrl();
    res.redirect(authUrl);
  }

  @Get('callback')
  async outlookAuthRedirect(@Query('code') code: string,@Res() res ) {
    const accessToken = await this.outAuthLookService.getToken(code);
    res.redirect(`/outlook/events?accessToken=${accessToken}`);
  }

  @Get('events')
  async getEvents(@Query('accessToken') accessToken: string) {
    const events = await this.outAuthLookService.getCalendarEvents(accessToken);
    return events;
  }
}
