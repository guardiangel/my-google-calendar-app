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
import { GoogleAuthModule } from './googleauth/googleauth.module';
import { GoogleAuthController } from './googleauth/googleauth.controller';
import { GoogleAuthService } from './googleauth/googleauth.service';
import { JwtService } from '@nestjs/jwt';
import { OutLookController } from './outlookauth/outlookauth.controller';
import { OutAuthLookService } from './outlookauth/outlookauth.service';
import { GoogleStrategy } from './googleauth/strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GoogleAuthModule,
    PassportModule.register({ defaultStrategy: 'google' })
  ],
  controllers: [GoogleAuthController, OutLookController ],
  providers: [GoogleAuthService, JwtService, OutAuthLookService, GoogleStrategy],
})
export class AppModule {}

