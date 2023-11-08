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
  