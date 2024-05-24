import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get('events')
  @UseGuards(JwtAuthGuard)
  async getEvents(@Req() req) {
    console.log("req.user.accessToken",req.user.accessToken)
    return this.calendarService.getEvents(req.user.accessToken);
  }
}
