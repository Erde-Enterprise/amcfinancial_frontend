import { useContext } from "react";
import api from "./api";
import AuthContext from "./auth";
import { useNavigate } from "react-router-dom";
import { verifyRequest } from "../utils/utils";
import { AxiosError } from "axios";
import { snackActions } from "../utils/notification/snackbar-util";

function useEndPoint() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  async function login(email_or_nickname: string, password: string) {
    try {
      const response = await api.post("/login", {
        email_or_nickname,
        password,
      });
      const success = await verifyRequest(response, "Welcome!");

      if (success) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate('/dashboard');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.message);
    }
  }
  function logOff(){
    //Esvaizar o Local Storage do User e o Context do User
  }
  return { login, logOff };
}

export default useEndPoint;
