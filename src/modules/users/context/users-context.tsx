import { Dispatch, SetStateAction, createContext, useState } from "react";
import { UserEntity } from "../model/user.entity";

interface UsersContextData {
    users: UserEntity[] | undefined;
    loading: boolean;
    setUsers: Dispatch<SetStateAction<UserEntity[] | undefined>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
  }
  
  const UsersContext = createContext<UsersContextData | undefined>(undefined);
  
  export function UsersProvider({ children }: any) {
    const [users, setUsers] = useState<UserEntity[] | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
  
    return (
      <UsersContext.Provider
        value={{ users, loading, setUsers, setLoading }}
      >
        {children}
      </UsersContext.Provider>
    );
  }
  
  export default UsersContext;