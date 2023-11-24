import { AxiosError } from "axios";
import api from "../../../auth/api";
import { snackActions } from "../../../utils/notification/snackbar-util";
import { UserInsertEntity } from "../model/user.entity";
import { useContext } from "react";
import UsersContext from "../context/users-context";

function useUser() {
  const user = useContext(UsersContext);
  async function registerUser(newUser: UserInsertEntity) {
    try {
      const formData = new FormData();
      formData.append("name", newUser.name);
      formData.append("nickname", newUser.nickname);
      formData.append("email", newUser.email);
      formData.append("password", newUser.password);
      formData.append("type", newUser.type.toString());
      if (newUser.photo) {
        formData.append("photo", newUser.photo as File);
      }
      await api.sendForm("/register/customer/", formData);
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.request.response);
    }
  }

  async function listAllUsers(){
    try { 
    const response =  await api.get("/list/customers/");
    return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.request.response);
    }
  }
  
  
  async  function getAllUsers() {
      user?.setLoading(true);
      await listAllUsers().then((data)=>{
        user?.setUsers(data?.data);
        user?.setLoading(false);
      });

    };
    async function deleteUser(nickname: string){
      try {
        await api.delete("/delete/customer/", {
          data: { nickname: nickname },
        });
      } catch (error) {
        console.error(error);
        const axiosError = error as AxiosError;
        snackActions.error(axiosError.message);
      }
    }

  return { registerUser, user, getAllUsers, deleteUser };
}
export default useUser;
