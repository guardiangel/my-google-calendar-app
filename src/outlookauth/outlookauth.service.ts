import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class OutLookService {
  private readonly clientId = '94f8032b-3792-41ac-bf28-481629d57a0f';
  // private readonly tenantId = '54ae6b24-5c24-4e13-9730-4dcd5d24f5a7';
  private readonly tenantId = '54ae6b24-5c24-4e13-9730-4dcd5d24f5a7';
  private readonly clientSecret = 'a0e8Q~qbMtV_o42C6Cuh.CHd1IKM84GA~cEVJchD';
  private readonly scope = 'https://graph.microsoft.com/.default';
  private readonly tokenEndpoint = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;
  // private readonly tokenEndpoint = `https://login.microsoftonline.com/common/oauth2/v2.0/token`;

  async getAccessToken(): Promise<string> {

        let   response = await axios.post(this.tokenEndpoint, 
                {grant_type: 'client_credentials',
                client_id: this.clientId,
                client_secret: this.clientSecret,
                scope: this.scope,
              },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }}
        );

  

    return response.data.access_token;
  }
}
