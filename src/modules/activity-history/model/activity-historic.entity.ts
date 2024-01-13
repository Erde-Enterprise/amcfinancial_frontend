export interface ActivityHistoricEntity {
    user_nickname: string;
    login_date: string;
    login_time: string;
    location: string;
    status: boolean;
    photo?: string;
    mime_type?: string;
  }
  export interface ActivityHistoricRowEntity {
    user_nickname: string;
    login_date: string;
    login_time: string;
    location: string;
    status: string;
  }