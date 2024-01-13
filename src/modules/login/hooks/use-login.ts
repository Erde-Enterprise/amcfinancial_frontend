import { useContext } from "react";
import api, { SECURITY_KEY } from "../../../auth/api";
import AuthContext from "../../../auth/auth";
import { useNavigate } from "react-router-dom";
import { verifyRequest } from "../../../utils/utils";
import { AxiosError } from "axios";
import { snackActions } from "../../../utils/notification/snackbar-util";
import * as CryptoJS from 'crypto-js';


function useLogin() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function login(email_or_nickname: string, password: string, latitude: number, longitude: number) {
    try {
      const response = await api.post("/login/", {
        email_or_nickname,
        password,
        latitude,
        longitude
      });
      const success = await verifyRequest(response);

      if (success) {
        snackActions.success(`Successfully`);
        setUser(response.data);
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(response.data),
          SECURITY_KEY
        ).toString();
        localStorage.setItem("user", encryptedData);
        navigate("/dashboard/");
      }
      
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.message);
    }
  }
  function logOut(){
    navigate("/login/");
  }

  return { login, logOut };
}

export default useLogin;
