import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { googleConfig } from './config';

@Injectable()
export class AuthService {
  

  private oauth2Client: any;

  constructor() {
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
    return tokens;
  }

  async refreshToken() {
    const { tokens } = await this.oauth2Client.refreshToken("1//04qn6E5_B3JYpCgYIARAAGAQSNwF-L9Ir7YjoPb12nMhNq9_x3qXGd9MajN6k9Cy6rfabrT469PT93atIKXZdCagrVHdYv7CcJRs");
    return tokens;
  }
}

