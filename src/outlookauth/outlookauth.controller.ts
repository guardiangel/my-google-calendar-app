import { Controller, Get } from '@nestjs/common';
import { OutLookGraphService } from './outlookgraph.service';

@Controller('outlook')
export class OutLookController {
  constructor(private readonly outLookGraphService: OutLookGraphService) {}

  @Get('events')
  async getCalendarEvents() {
    console.log("outlookauth.controller.ts ***********")
    return await this.outLookGraphService.getCalendarEvents();
  }
}
