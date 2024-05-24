// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
// import { CalendarModule } from './calendar/calendar.module';
// import { AuthController } from './auth/auth.controller';
// import { CalendarController } from './calendar/calendar.controller';
// import { AuthService } from './auth/auth.service';
// import { CalendarService } from './calendar/calendar.service';
// import { JwtService } from '@nestjs/jwt';

// @Module({
//   imports: [ ConfigModule.forRoot({
//     isGlobal: true,
//   }),
//   AuthModule,
//   CalendarModule
// ],
//   controllers: [AppController, AuthController, CalendarController],
//   providers: [AppService, AuthService, CalendarService, JwtService],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CalendarModule } from './calendar/calendar.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { CalendarController } from './calendar/calendar.controller';
import { CalendarService } from './calendar/calendar.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CalendarModule,
  ],
  controllers: [AuthController,CalendarController ],
  providers: [AuthService, JwtService,CalendarService],
})
export class AppModule {}

