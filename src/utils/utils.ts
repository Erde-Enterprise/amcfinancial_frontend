
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

export function transformDateFormat(date: string): string {
  const dateParts = date.split(/[-/]/);
  if (dateParts.length !== 3) {
      return "";
  }
  if (date.indexOf('-') > -1) {
      // Formato AAAA-MM-DD para DD/MM/AAAA
      return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  } else {
      // Formato DD/MM/AAAA para AAAA-MM-DD
      return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }
}



