export interface InvoiceInsertEntity {
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
  }
  