import { AxiosError } from "axios";
import { snackActions } from "../../../utils/notification/snackbar-util";
import api from "../../../auth/api";
import { ClinicsEntity } from "../model/clinics.entity";
import { useState } from "react";

function useClinic() {
    const [clinics, setClinics] = useState<ClinicsEntity[] | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
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
        setLoading(true);
        await listAllClinics().then((data)=>{
          setClinics(data?.data);
          setLoading(false);
        });

      };
  
  
  
    return { registerClinic, clinics, loading, getAllClinics };
  }
  export default useClinic;