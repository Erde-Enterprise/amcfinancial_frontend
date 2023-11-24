import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { InvoiceEntity } from "../model/dashboard.entity";

interface InvoiceContextData {
  invoices: InvoiceEntity[] | undefined;
  loading: boolean;
  setInvoices: Dispatch<SetStateAction<InvoiceEntity[] | undefined>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const InvoiceContext = createContext<InvoiceContextData | undefined>(undefined);

export function InvoiceProvider({ children }: any) {
  const [invoices, setInvoices] = useState<InvoiceEntity[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <InvoiceContext.Provider
      value={{ invoices, loading, setInvoices, setLoading }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export default InvoiceContext;
