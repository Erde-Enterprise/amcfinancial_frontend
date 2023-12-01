export interface UserInsertEntity {
    email: string;
    nickname: string;
    name: string;
    photo?: File;// necessário que seja convertido para binary string para a API
    type: number;
    password: string;
  }
  export interface UserEntity{
    id?: number,
    name: string;
    nickname: string;
    email: string;
    photo?: File;
    type: number;
    mime_type: string;
  }
  export interface UserRowEntity{
    id?: number,
    name: string;
    nickname: string;
    email: string;
    photo?: string;
    type: number;
  }
  export interface UserUpdateEntity{
    new_nickname: string;
    name: string;
    nickname: string;
    email: string;
    photo?: File;
    type: number;
    password: string;
  }