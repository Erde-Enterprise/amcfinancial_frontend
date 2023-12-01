import { AxiosError } from "axios";
import api from "../../../auth/api";
import { snackActions } from "../../../utils/notification/snackbar-util";
import { UserInsertEntity, UserUpdateEntity } from "../model/user.entity";
import { useContext } from "react";
import UsersContext from "../context/users-context";
import { base64ToBlob } from "../utils/utils";
import { verifyRequest } from "../../../utils/utils";

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
      await api.sendForm("/register/customer/", formData).then(async (res) => {
        const success = await verifyRequest(res);
        if (success) {
          snackActions.success(`Successfully`);
        }
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.request.response);
    }
  }
  async function updateUser(newUser: UserUpdateEntity) {
    try {
      const formData = new FormData();
      formData.append("name", newUser.name);
      formData.append("nickname", newUser.nickname);
      formData.append("new_nickname", newUser.new_nickname);
      formData.append("email", newUser.email);
      formData.append("password", newUser.password);
      formData.append("type", newUser.type.toString());
      if (newUser.photo) {
        formData.append("photo", newUser.photo as File);
      }

      await api
        .sendUpdateForm("/update/customer/", formData)
        .then(async (res) => {
          const success = await verifyRequest(res);
          if (success) {
            snackActions.success(`Successfully`);
          }
        });
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.request.response);
    }
  }

  async function listAllUsers() {
    try {
      const response = await api.get("/list/customers/");
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.request.response);
    }
  }

  async function getAllUsers() {
    user?.setLoading(true);
    await listAllUsers().then((data) => {
      user?.setUsers(data?.data);
      user?.setLoading(false);
    });
  }
  async function deleteUser(nickname: string) {
    try {
      await api
        .delete("/delete/customer/", {
          data: { nickname: nickname },
        })
        .then(async (res) => {
          const success = await verifyRequest(res);
          if (success) {
            snackActions.success(`Successfully`);
          }
        });
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.message);
    }
  }

  return { registerUser, user, getAllUsers, deleteUser, updateUser };
}
export default useUser;
