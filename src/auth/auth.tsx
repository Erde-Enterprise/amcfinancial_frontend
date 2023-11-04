import { createContext, useEffect, useState } from "react";
import { UserModel } from "./model/user";
import { Box, CircularProgress } from "@mui/material";
import { SECURITY_KEY } from "./api";
import * as CryptoJS from 'crypto-js';

interface AuthContextData {
  user: UserModel | undefined;
  isLogged: boolean;
  setUser: (user: UserModel) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserModel>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const updateUser = (user: UserModel) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const descrypt = CryptoJS.AES.decrypt(storedUser, SECURITY_KEY);
      setUser(JSON.parse(descrypt.toString(CryptoJS.enc.Utf8)));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged: isLoggedIn,
        setUser: updateUser,
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContext;
