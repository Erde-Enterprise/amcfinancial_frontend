import { AxiosError } from "axios";
import api from "../../../auth/api";
import { snackActions } from "../../../utils/notification/snackbar-util";
import { verifyRequest } from "../../../utils/utils";
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
        // const binaryString = await new Promise<string>((resolve, reject) => {
        //   const reader = new FileReader();
        //   reader.onload = event => resolve(event.target!.result as string);
        //   reader.onerror = error => reject(error);
        //   reader.readAsText(newUser.photo as File);
        // });
        // formData.append("photo", binaryString);
        formData.append("photo", newUser.photo as File);
      }
      formData.forEach((item)=>{
        console.log(item);
      });
      const response = await api.post("/register/customer/", formData);
  
      const success = await verifyRequest(response);
      if (success) {
        snackActions.success(`Insertion Successfully`);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.message);
    }
  }
  

  return { registerUser };
}
export default useUser;
