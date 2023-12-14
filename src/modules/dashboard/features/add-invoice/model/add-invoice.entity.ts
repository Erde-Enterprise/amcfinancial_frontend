export interface InvoiceInsertEntity {
    rechnung: string;
    name: string;
    price: string;
    dueDate: string;
    mahnung: number;
    description: string;
    scheduledDate?: string;
    issuedOn: string;
    attachment: File;
    status: string;
    type: string;
    clinic: string;
  }
  