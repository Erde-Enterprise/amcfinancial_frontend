import { AxiosError } from "axios";
import api from "../../../auth/api";
import { snackActions } from "../../../utils/notification/snackbar-util";
import { UserInsertEntity } from "../model/user.entity";

function useUser() {
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

  return { registerUser };
}
export default useUser;
