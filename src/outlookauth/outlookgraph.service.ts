import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { OutLookService } from './outlookauth.service';

@Injectable()
export class OutLookGraphService {
  constructor(private readonly outLookService: OutLookService) {}

  async getCalendarEvents(): Promise<any> {

    const token = await this.outLookService.getAccessToken();

    console.log("outlookgraph.service.ts  token", token)

    let response=null;

    const userId = "felix_sgq@outlook.com"

    try {
       response = await axios.get('https://graph.microsoft.com/v1.0/users/'+userId+'/calendar', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type':"application/json",
        },
      });
    }catch(err:any) {
      console.log("err**************************************************",err)
    }

    return response.data;
  }
}
