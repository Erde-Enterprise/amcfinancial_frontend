import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { snackActions } from "../../../utils/notification/snackbar-util";
import api from "../../../auth/api";
import { getKeyFromValue } from "../../../utils/utils";
import { InvoiceInsertEntity } from "../features/add-invoice/model/add-invoice.entity";
import { CustomTypeEnum } from "../../../components/inputs/enum/type.enum";
import { StatusInvoiceEnum } from "../features/add-invoice/enum/add-invoice.enum";
import { useState } from "react";
import { InvoiceEntity } from "../model/dashboard.entity";

function useDashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<InvoiceEntity[] | undefined>();
  const navigate = useNavigate();
  function goToAddInvoice() {
    navigate("/new-invoice/");
  }
  async function registerInvoice(invoice: InvoiceInsertEntity) {
    try {
      const formData = new FormData();
      formData.append("amount", invoice.price);
      formData.append("description", invoice.description);
      formData.append("due_date", invoice.dueDate);
      formData.append("invoice_number", invoice.rechnung);
      formData.append("issue_date", invoice.issuedOn);
      formData.append("name_clinic", invoice.clinic);
      formData.append("status", getKeyFromValue(invoice.status, StatusInvoiceEnum));
      formData.append("title", invoice.name);
      formData.append("type", getKeyFromValue(invoice.type, CustomTypeEnum));
      if (invoice.attachment) {
        formData.append("attachment", invoice.attachment as File);
      }
        formData.append("reminder", invoice.mahnung.toString());
      
      await api.sendForm("/register/invoice/", formData);
      
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.request.response);
    }
  }
  async function listInvoices(initialDate?: string, finalDate?: string){
    try { 
      const response =  await api.get("/list/invoices/",{
        params:{
          start_date: initialDate,
          end_date: finalDate
        }
      });
      return response;
      } catch (error) {
        const axiosError = error as AxiosError;
        snackActions.error(axiosError.request.response);
      }
  }
  async function getInvoices(initialDate?: string, finalDate?: string){
    setLoading(true);
    await listInvoices(initialDate, finalDate).then((data)=>{
      setInvoices(data?.data);
      setLoading(false);
    });
  }

  return { goToAddInvoice, registerInvoice, invoices,loading, getInvoices };
}

export default useDashboard;
