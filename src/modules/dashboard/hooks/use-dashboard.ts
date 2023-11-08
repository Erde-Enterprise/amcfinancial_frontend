import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { snackActions } from "../../../utils/notification/snackbar-util";
import api from "../../../auth/api";
import { getKeyFromValue } from "../../../utils/utils";
import { InvoiceInsertEntity } from "../features/add-invoice/model/add-invoice.entity";
import { CustomTypeEnum } from "../../../components/inputs/enum/type.enum";

function useDashboard() {
  const navigate = useNavigate();
  function goToAddInvoice() {
    navigate("/new-invoice/");
  }
  async function registerInvoice(invoice: InvoiceInsertEntity) {
    try {
      const formData = new FormData();
      formData.append("amount", invoice.mahnung);
      formData.append("description", invoice.description);
      formData.append("due_date", invoice.dueDate);
      formData.append("invoice_number", invoice.rechnung);
      formData.append("issue_date", invoice.issuedOn);
      formData.append("name_clinic", invoice.clinic);
      formData.append("status", invoice.status);
      formData.append("title", invoice.name);
      formData.append("type", getKeyFromValue(invoice.type, CustomTypeEnum));
      if (invoice.attachment) {
        formData.append("attachment", invoice.attachment as File);
      }
      await api.sendForm("/register/invoice/", formData);
      
    } catch (error) {
      const axiosError = error as AxiosError;
      snackActions.error(axiosError.request.response);
    }
  }

  return { goToAddInvoice, registerInvoice };
}

export default useDashboard;
