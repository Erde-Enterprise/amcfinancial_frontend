import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { snackActions } from "../../../utils/notification/snackbar-util";
import api from "../../../auth/api";
import { getKeyFromValue, verifyRequest } from "../../../utils/utils";
import { InvoiceInsertEntity } from "../features/add-invoice/model/add-invoice.entity";
import { CustomTypeEnum } from "../../../components/inputs/enum/type.enum";
import { StatusInvoiceEnum } from "../features/add-invoice/enum/add-invoice.enum";
import { useContext, useState } from "react";
import { InvoiceEntity, InvoiceUpdateEntity } from "../model/dashboard.entity";
import InvoiceContext from "../context/invoice-context";

function useDashboard() {
  const invoice = useContext(InvoiceContext);
  const navigate = useNavigate();
  function goToAddInvoice() {
    navigate("/new-invoice/");
  }

  async function registerInvoice(invoice: InvoiceInsertEntity) {
    try {
      const formData = new FormData();
      formData.append("amount", parseFloat(invoice.price.replace(',','.')).toString());
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
      await api.sendForm("/register/invoice/", formData).then(async (res) => {
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
    invoice?.setLoading(true);
    await listInvoices(initialDate, finalDate).then((data) => {
      invoice?.setInvoices(data?.data);
      invoice?.setLoading(false);
    });
  }

  async function uniqueInvoice(rechnung: string) {
    try {
      const response = await api.get("/find/invoice/", {
        params: {
          invoice_number: rechnung,
        },
      });
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.request.response);
    }
  }

  async function getUniqueInvoice(rechung: string) {
    invoice?.setLoading(true);
    await uniqueInvoice(rechung).then((data) => {
      const uniqueData: InvoiceEntity[] = [];
      uniqueData.push(data?.data);
      invoice?.setInvoices(uniqueData);
      invoice?.setLoading(false);
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

      await api
        .sendUpdateForm("/update/invoice/", formData)
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

  async function deleteInvoice(invoices_numbers: string[]) {
    try {
      await api
        .delete("/delete/invoice/", {
          data: { invoices_number: invoices_numbers },
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
  async function downloadInvoice(invoice_number: string, name_invoice: string) {
    try {
      const response = await api.post("/attachment/", {
        invoice_number,
      });
      const base64Response = response.data.attachment;
      const fileType = response.data.mime_type;
      const fileBlob = base64ToBlob(base64Response, fileType);
      const url = URL.createObjectURL(fileBlob);
      window.open(url, name_invoice);
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.message);
    }
  }

  function base64ToBlob(base64: string, type: string) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type });
  }


  async function getTotalSum(scheduled_date?: string){
    try {
      const response = await api.get("/sum/amount/", {
        params: {
          scheduled_date: scheduled_date || ""
        }
      });
      
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.request.response);
    }
  }
  async function getScheduledSum(scheduled_date?: string){
    try {
      const response = await api.get("/sum/scheduled/", {
        params: {
          scheduled_date: scheduled_date || ""
        }
      });
      
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.request.response);
    }
  }
  return {
    goToAddInvoice,
    registerInvoice,
    invoice,
    getInvoices,
    updateInvoice,
    deleteInvoice,
    downloadInvoice,
    getUniqueInvoice,
    getTotalSum,
    getScheduledSum
  };
}
export default useDashboard;
