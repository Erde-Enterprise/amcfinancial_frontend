import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { snackActions } from "../../../utils/notification/snackbar-util";
import api from "../../../auth/api";
import { getKeyFromValue } from "../../../utils/utils";
import { InvoiceInsertEntity } from "../features/add-invoice/model/add-invoice.entity";
import { CustomTypeEnum } from "../../../components/inputs/enum/type.enum";
import { StatusInvoiceEnum } from "../features/add-invoice/enum/add-invoice.enum";
import { useState } from "react";
import { InvoiceEntity, InvoiceUpdateEntity } from "../model/dashboard.entity";

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
      formData.append(
        "status",
        getKeyFromValue(invoice.status, StatusInvoiceEnum)
      );
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

  async function listInvoices(initialDate?: string, finalDate?: string) {
    try {
      const response = await api.get("/list/invoices/", {
        params: {
          start_date: initialDate,
          end_date: finalDate,
        },
      });
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.request.response);
    }
  }

  async function getInvoices(initialDate?: string, finalDate?: string) {
    setLoading(true);
    await listInvoices(initialDate, finalDate).then((data) => {
      setInvoices(data?.data);
      setLoading(false);
    });
  }

  async function updateInvoice(invoice: InvoiceUpdateEntity) {
    try {
      const formData = new FormData();
      formData.append("amount", invoice.amount.toString());
      formData.append("description", invoice.description);
      formData.append("due_date", invoice.due_date);
      formData.append("invoice_number", invoice.invoice_number);
      formData.append("issue_date", invoice.issue_date);
      formData.append("name_clinic", invoice.name_clinic);
      formData.append("status", invoice.status);
      formData.append("title", invoice.title);
      formData.append("type", invoice.type);
      if (invoice.attachment) {
        formData.append("attachment", invoice.attachment as File);
      }
      formData.append("reminder", invoice.reminder.toString());
      formData.append("new_invoice_number", invoice.new_invoice_number);
      
      await api.sendUpdateForm("/update/invoice/", formData);
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.request.response);
    }
  }

  async function deleteInvoice(invoice_number: string[]) {
    try {
      await api.delete("/delete/invoice/", {
        data: { invoices_number: invoice_number },
      });
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.message);
    }
  }

  return {
    goToAddInvoice,
    registerInvoice,
    invoices,
    loading,
    getInvoices,
    updateInvoice,
    deleteInvoice,
  };
}

export default useDashboard;
