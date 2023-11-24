import { AxiosError } from "axios";
import { snackActions } from "../../../utils/notification/snackbar-util";
import api from "../../../auth/api";
import { ClinicsEntity } from "../model/clinics.entity";
import { useContext, useState } from "react";
import ClinicsContext from "../context/clinics-context";

function useClinic() {
  const clinic = useContext(ClinicsContext);
    // const [clinics, setClinics] = useState<ClinicsEntity[] | undefined>();
    // const [loading, setLoading] = useState<boolean>(false);
    async function registerClinic(clinic: ClinicsEntity):Promise<void> {
      try {
        const formData = new FormData();
        formData.append("name", clinic.name);
        formData.append("color", clinic.color);
        
        await api.post("/register/clinic/", formData);
      } catch (error) {
        const axiosError = error as AxiosError;
        snackActions.error(axiosError.request.response);
      }
    }
    async function listAllClinics(){
      try { 
      const response =  await api.get("/list/clinics/");
      return response;
      } catch (error) {
        const axiosError = error as AxiosError;
        snackActions.error(axiosError.request.response);
      }
    }
    
    
    async  function getAllClinics() {
        clinic?.setLoading(true);
        await listAllClinics().then((data)=>{
          clinic?.setClinics(data?.data);
          clinic?.setLoading(false);
        });

      };

      async function deleteClinic(clinic_name: string){
        
          try {
            await api.delete("/delete/clinic/", {
              data: { name: clinic_name },
            });
          } catch (error) {
            console.error(error);
            const axiosError = error as AxiosError;
            snackActions.error(axiosError.message);
          }
        
      }
  
  
  
    return { registerClinic, clinic, getAllClinics, deleteClinic };
  }
  export default useClinic;