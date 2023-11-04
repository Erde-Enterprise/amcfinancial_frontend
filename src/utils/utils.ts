
import { AxiosResponse } from 'axios';

export async function verifyRequest(request: AxiosResponse<any>): Promise<boolean> {
  const response = await request;
  if(response.status === 200){
    
    return true;
  }
  return false;
}



