export interface UserInsertEntity {
    access_token: string;
    email: string;
    nickname: string;
    name: string;
    photo?: File;// necessário que seja convertido para binary string para a API
    type: number;
    password: string;
  }