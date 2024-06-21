import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { google } from 'googleapis';
import { googleConfig } from './config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  

  private oauth2Client: any;

  constructor(private readonly httpService: HttpService) {
    this. oauth2Client = new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirectUri,
    );
  }
  

  getAuthUrl() {
    const scopes = [
      // 'https://www.googleapis.com/auth/calendar',
      // 'https://www.googleapis.com/auth/userinfo.profile',
      // 'https://www.googleapis.com/auth/userinfo.email',
      'profile', 'email', 'openid https://www.googleapis.com/auth/calendar.readonly'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline', // This is required to get a refresh token
      scope: scopes,
    });
  }

  async getToken(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);

    // const access_token = tokens.id_token;
    // try {
    //   const ticket = await this.oauth2Client.verifyIdToken({
    //     idToken: access_token,
    //     audience:  googleConfig.clientId,
    //   });
    //   const payload = ticket.getPayload();

    //   console.log("AuthService getToken payload", payload);
    // } catch (error) {
    //   console.log("AuthService getToken error",error);
    //   throw new Error('AuthService Invalid token');
    // }

    const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${tokens.access_token}`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
     console.log("response.data==", response.status)
    } catch (error) {
      console.log("response error", error);
      throw new Error('Invalid access token');
    }

    return tokens;
  }

  async refreshToken() {
    const { tokens } = await this.oauth2Client.refreshToken("1//04qn6E5_B3JYpCgYIARAAGAQSNwF-L9Ir7YjoPb12nMhNq9_x3qXGd9MajN6k9Cy6rfabrT469PT93atIKXZdCagrVHdYv7CcJRs");
    return tokens;
  }
}

