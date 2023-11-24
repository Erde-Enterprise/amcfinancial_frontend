import { Dispatch, SetStateAction, createContext, useState } from "react";
import { ClinicsEntity } from "../model/clinics.entity";

interface ClinicsContextData {
    clinics: ClinicsEntity[] | undefined;
    loading: boolean;
    setClinics: Dispatch<SetStateAction<ClinicsEntity[] | undefined>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
  }
  
  const ClinicsContext = createContext<ClinicsContextData | undefined>(undefined);
  
  export function ClinicsProvider({ children }: any) {
    const [clinics, setClinics] = useState<ClinicsEntity[] | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
  
    return (
      <ClinicsContext.Provider
        value={{ clinics, loading, setClinics, setLoading }}
      >
        {children}
      </ClinicsContext.Provider>
    );
  }
  
  export default ClinicsContext;