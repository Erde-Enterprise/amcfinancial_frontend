
import { AxiosResponse } from 'axios';

export async function verifyRequest(request: AxiosResponse<any>): Promise<boolean> {
  const response = await request;
  if(response.status === 200 || response.status === 201){
    
    return true;
  }
  return false;
}
export function getKeyFromValue(value: string, typeEnum: any): string {
  const index = (Object.values(typeEnum) as string[]).indexOf(value);
  if (index === -1) {
    return "";
  }
  return Object.keys(typeEnum)[index];
}
export function getValueFromKey(key: string, typeEnum: any): string {
  const index = (Object.keys(typeEnum) as string[]).indexOf(key);
  if (index === -1) {
    return "";
  }
  return (Object.values(typeEnum) as string[])[index];
}



