import { ClinicsEntity } from "../../clinics/model/clinics.entity";

export interface DashboardInsertEntity {
  invoice_number: string;
  description: string;
  amount: number;
  title: string;
  issue_date: string;
  due_date: string;
  attachment: File;
  status: string;
  type: string;
  name_clinic: string;
}
export interface InvoiceEntity {
  id?: number;
  clinic: ClinicsEntity;
  invoice_number: string;
  description: string;
  amount: number;
  title: string;
  issue_date: string;
  due_date: string;
  reminder: number;
  status: string;
  type: string;
}
export interface InvoiceRowsEntity {
  rechnung: string;
  name: string;
  price: number;
  dueDate: string;
  mahnung: number;
  description: string;
  issuedOn: string;
  attachment: string;
  status: string;
  type: string;
  clinic: string;
  invoice: InvoiceEntity;
  checked?: boolean
}

export interface InvoiceUpdateEntity {
  attachment: File;
  new_invoice_number: string;
  name_clinic: string;
  invoice_number: string;
  description: string;
  amount: number;
  title: string;
  issue_date: string;
  due_date: string;
  reminder: number;
  status: string;
  type: string;
}
