import { SxProps, Theme } from "@mui/material";
import { InvoiceInsertEntity } from "../features/add-invoice/model/add-invoice.entity";
import { snackActions } from "../../../utils/notification/snackbar-util";

export const styleMenuItem: SxProps<Theme> | undefined = {
  color: "#A0A3BD",
};
export const styleMenuIconItem: SxProps<Theme> | undefined = {
  marginRight: 2,
};

export function getRandomPhrase(): string {
  let financialPhrases: string[] = [
    "Today is a great day to conduct financial activities.",
    "It's a perfect day to dive into the financial world.",
    "Today is a wonderful day to make smart financial decisions.",
    "It's a fantastic day to explore new financial opportunities.",
    "Today is an excellent day to invest in your financial future.",
    "It's a splendid day to learn more about finance.",
    "Today is a superb day to improve your financial literacy.",
    "It's an amazing day to plan for your financial future.",
    "Today is a brilliant day to work on your budget.",
    "It's an ideal day to review your investments.",
    "Today is a perfect day to set new financial goals.",
    "It's a great day to check on your savings and investments.",
    "Today is a good day to think about retirement planning.",
    "It's a wonderful day to work on your tax planning.",
    "Today is an excellent day for financial strategizing.",
    "It's a good day to think about diversifying your portfolio.",
    "Today is a great day for financial planning and organization.",
    "It's an ideal day for reviewing your insurance policies.",
    "Today is a perfect day for wealth creation and management.",
    "It's a fantastic day for improving your credit score.",
    "Today is an excellent day for debt management and reduction.",
    "It's a wonderful day for learning about the stock market.",
    "Today is a good day for exploring real estate investments.",
    "It's an amazing day for setting up an emergency fund.",
    "Today is a brilliant day for learning about mutual funds and ETFs.",
    "It's an ideal day for setting up automatic savings transfers.",
    "Today is a perfect day for checking on your financial health.",
    "It's a great day for creating a new income stream.",
    "Today is an excellent day for reviewing your financial goals progress.",
  ];
  let randomIndex = Math.floor(Math.random() * financialPhrases.length);
  return financialPhrases[randomIndex];
}

export function validateForm(invoice: InvoiceInsertEntity) {
  for (let key in invoice) {
    if (key === "attachment") {
      if ((invoice[key as keyof InvoiceInsertEntity] as File).size === 0) {
        snackActions.error(`${key} is required.`);
        return false;
      }
    } else if (invoice[key as keyof InvoiceInsertEntity] === "") {
      snackActions.error(`${key} is required.`);
      return false;
    }
  }
  return true;
}

export const validatorsInvoice = {
  rechnung: (value: string) => value !== "" && /^[0-9]+$/.test(value),
  name: (value: string) => value !== "",
  price: (value: string) => value !== "" && /^[0-9]*\.?[0-9]*$/.test(value),
  dueDate: (value: string) => value !== "", //&& /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/.test(value),
  mahnung: (value: number) => value >= 0,
  description: (value: string) => value !== "",
  issuedOn: (value: string) => value !== "", // && /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/.test(value),
  attachment: (file: File) =>
    /\.(pdf|jpg|jpeg|png|gif)$/.test(file.name.toLowerCase()),
  status: (value: string) => value !== "",
  type: (value: string) => value !== "",
  clinic: (value: string) => value !== "",
};

export function getFirstDayOfMonth() {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const year = firstDayOfMonth.getFullYear();
  const month = ("0" + (firstDayOfMonth.getMonth() + 1)).slice(-2);
  const day = ("0" + firstDayOfMonth.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

export function getToday() {
  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

export function getColor(mahnung: number){
  if (mahnung >= 3) {
    return "#FF0000";
  } else if (mahnung === 2) {
    return "#FF9900";
  } else if (mahnung === 1) {
    return "#DDFF00";
  } else {
    return undefined;
  }
};
export function getColorWithOpacity(mahnung: number){
  const color = getColor(mahnung);
  if (color) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  } else {
    return `rgba(0, 0, 0, 0.2)`;
  }
};

