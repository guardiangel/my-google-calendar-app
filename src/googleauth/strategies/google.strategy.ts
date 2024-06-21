import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Request, Response } from 'express';
import { LoggingInterceptor } from 'src/interceptors/LoggingInterceptor';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      // callbackURL: configService.get<string>('GOOGLE_CALLBACK_URI'),//http://localhost:3000/api/auth/callback/google
      callbackURL: "http://localhost:4000/googleauth/google/callback",//http://localhost:3000/api/auth/callback/google
      //passReqToCallback: true,  // Allows passing the request to the callback
      scope: ['profile', 'email', 'openid https://www.googleapis.com/auth/calendar.readonly'],
      accessType: 'offline',
      prompt: 'consent',
    });
  }

  async validate(
     accessToken: string, 
     refreshToken: string, 
     profile: any,
     done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const googleuser = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };

     // Retrieve the custom parameter from the request query
     //const queryParameter = req.query.customParam;

     console.log("refreshToken=========: ", refreshToken);
     console.log("accessToken=========: ", accessToken);
    
    done(null, googleuser);
  }
}
