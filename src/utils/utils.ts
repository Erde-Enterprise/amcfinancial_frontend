import { snackActions } from "./notification/snackbar-util";

import { AxiosResponse } from 'axios';

export async function verifyRequest(request: AxiosResponse<any>, successMessage: string): Promise<boolean> {
  const response = await request;
  if(response.status === 200){
    //snackActions.success(successMessage);
    return true;
  }
  return false;
}


