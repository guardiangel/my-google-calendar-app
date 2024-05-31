import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as msal from '@azure/msal-node';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class OutAuthLookService {

  private msalClient: msal.ConfidentialClientApplication;
  constructor(private configService: ConfigService) {
    this.msalClient = new msal.ConfidentialClientApplication({
      auth: {
        clientId: this.configService.get<string>('AZURE_CLIENT_ID'),
        clientSecret: this.configService.get<string>('AZURE_CLIENT_SECRET'),
        authority: `https://login.microsoftonline.com/common`,
      },
    });
  }

  getAuthUrl(): Promise<string> {
    const authCodeUrlParameters = {
      scopes: this.configService.get<string>('AZURE_SCOPES').split(' '),
      redirectUri: this.configService.get<string>('AZURE_REDIRECT_URI'),
    };

    return this.msalClient.getAuthCodeUrl(authCodeUrlParameters);
  }

  async getToken(authCode: string): Promise<string> {
    const tokenRequest = {
      code: authCode,
      scopes: this.configService.get<string>('AZURE_SCOPES').split(' '),
      redirectUri: this.configService.get<string>('AZURE_REDIRECT_URI'),
    };

    const response = await this.msalClient.acquireTokenByCode(tokenRequest);
    if (response && response.accessToken) {
      return response.accessToken;
    } else {
      throw new Error('Could not acquire access token');
    }
  }

  async getCalendarEvents(accessToken: string): Promise<any> {
    const response = await axios.get('https://graph.microsoft.com/v1.0/me/events', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }


}
