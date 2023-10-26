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
    "Today is an excellent day for reviewing your financial goals progress."
  ];
let randomIndex = Math.floor(Math.random() * financialPhrases.length);
return financialPhrases[randomIndex];
}

export function validateForm(invoice: InvoiceInsertEntity) {
  for (let key in invoice) {
    if (invoice[key as keyof InvoiceInsertEntity] === '' || invoice[key as keyof InvoiceInsertEntity] === 0) {
      snackActions.error(`Erro: O campo ${key} está em branco.`);
      return false;
    }
  }
  return true;
}

