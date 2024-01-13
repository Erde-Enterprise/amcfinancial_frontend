import { useState } from "react"
import { ActivityHistoricEntity } from "../model/activity-historic.entity";
import api from "../../../auth/api";
import { snackActions } from "../../../utils/notification/snackbar-util";
import { AxiosError } from "axios";

export default function useActivityHistory(){
    const [loading, setLoading] = useState<boolean>(false);
    const [historic, setHistoric] = useState<ActivityHistoricEntity[]>([]);


    async function listAllHistoric(){
        try { 
        const response =  await api.get("/list/accessHistory/");
        return response;
        } catch (error) {
          const axiosError = error as AxiosError;
          snackActions.error(axiosError.request.response);
        }
      }
      
      
      async  function getAllHistoric() {
          setLoading(true);
          await listAllHistoric().then((data)=>{
            setHistoric(data?.data);
            setLoading(false);
          });
  
        };


    return {historic, loading, getAllHistoric}
}