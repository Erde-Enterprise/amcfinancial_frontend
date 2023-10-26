export interface InvoiceInsertEntity {
    rechnung: string;
    name: string;
    price: string;
    dueDate: string;
    mahnung: string;
    description: string;
    issuedOn: string;
    attachment: File;
    status: string;
    type: string;
    clinic: string;
  }
  