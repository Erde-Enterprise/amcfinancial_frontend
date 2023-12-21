import { SxProps, Theme } from "@mui/material";
import { InvoiceInsertEntity } from "../features/add-invoice/model/add-invoice.entity";
import { snackActions } from "../../../utils/notification/snackbar-util";
import { StatusInvoiceEnum } from "../features/add-invoice/enum/add-invoice.enum";

export const styleMenuItem: SxProps<Theme> | undefined = {
  color: "#A0A3BD",
};
export const styleMenuIconItem: SxProps<Theme> | undefined = {
  marginRight: 2,
};

export function getRandomPhrase(): string {
  let financialPhrases: string[] = [
    "Heute ist ein großartiger Tag für finanzielle Aktivitäten.",
    "Es ist ein perfekter Tag, um in die Finanzwelt einzutauchen.",
    "Heute ist ein wundervoller Tag, um kluge finanzielle Entscheidungen zu treffen.",
    "Es ist ein fantastischer Tag, um neue finanzielle Möglichkeiten zu erkunden.",
    "Heute ist ein ausgezeichneter Tag, um in deine finanzielle Zukunft zu investieren.",
    "Es ist ein herrlicher Tag, um mehr über Finanzen zu erfahren.",
    "Heute ist ein prächtiger Tag, um deine finanzielle Allgemeinbildung zu verbessern.",
    "Es ist ein erstaunlicher Tag, um für deine finanzielle Zukunft zu planen.",
    "Heute ist ein brillanter Tag, um an deinem Budget zu arbeiten.",
    "Es ist ein idealer Tag, um deine Investitionen zu überprüfen.",
    "Heute ist ein perfekter Tag, um neue finanzielle Ziele zu setzen.",
    "Es ist ein großartiger Tag, um deine Ersparnisse und Investitionen zu überprüfen.",
    "Heute ist ein guter Tag, um über die Planung deiner Rente nachzudenken.",
    "Es ist ein wundervoller Tag, um an deiner Steuerplanung zu arbeiten.",
    "Heute ist ein ausgezeichneter Tag für finanzielle Strategien.",
    "Es ist ein guter Tag, um über die Diversifizierung deines Portfolios nachzudenken.",
    "Heute ist ein großartiger Tag für finanzielle Planung und Organisation.",
    "Es ist ein idealer Tag, um deine Versicherungspolicen zu überprüfen.",
    "Heute ist ein perfekter Tag für Vermögensbildung und -management.",
    "Es ist ein fantastischer Tag, um deine Kreditwürdigkeit zu verbessern.",
    "Heute ist ein ausgezeichneter Tag für Schuldenmanagement und -reduktion.",
    "Es ist ein wundervoller Tag, um sich über die Börse zu informieren.",
    "Heute ist ein guter Tag, um Immobilieninvestitionen zu erkunden.",
    "Es ist ein erstaunlicher Tag, um einen Notfallfonds einzurichten.",
    "Heute ist ein brillanter Tag, um mehr über Investmentfonds und ETFs zu erfahren.",
    "Es ist ein idealer Tag, um automatische Sparüberweisungen einzurichten.",
    "Heute ist ein perfekter Tag, um deine finanzielle Gesundheit zu überprüfen.",
    "Es ist ein großartiger Tag, um eine neue Einnahmequelle zu schaffen.",
    "Heute ist ein ausgezeichneter Tag, um den Fortschritt deiner finanziellen Ziele zu überprüfen."
  ];
  let randomIndex = Math.floor(Math.random() * financialPhrases.length);
  return financialPhrases[randomIndex];
}

// export function validateForm(invoice: InvoiceInsertEntity) {
//   for (let key in invoice) {
//     if (key === "attachment") {
//       if ((invoice[key as keyof InvoiceInsertEntity] as File).size === 0) {
//         snackActions.error(`${key} is required.`);
//         return false;
//       }
//     } else if (invoice[key as keyof InvoiceInsertEntity] === "") {
//       snackActions.error(`${key} is required.`);
//       return false;
//     }
//   }
//   return true;
// }
export function validateForm(invoice: InvoiceInsertEntity) {
  for (let key in invoice) {
    if (key === "attachment") {
      if ((invoice[key as keyof InvoiceInsertEntity] as File).size === 0) {
        snackActions.error(`${key} is required.`);
        return false;
      }
    } else if (key !== 'scheduledDate' && invoice[key as keyof InvoiceInsertEntity] === "") {
      snackActions.error(`${key} is required.`);
      return false;
    }
  }

  // Adicionando a nova condição
  if (invoice.status === 'Schedule' && (invoice.scheduledDate === "" || invoice.scheduledDate === undefined)) {
    snackActions.error(`schedule is required when status is Schedule.`);
    return false;
  }

  return true;
}


export const validatorsInvoice = {
  rechnung: (value: string) => value !== "" && /^[0-9]+$/.test(value),
  name: (value: string) => value !== "",
  price: (value: string) => value !== "" && /^[0-9]*,?[0-9]*$/.test(value),
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

export function getLastDayOfMonth() {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const year = lastDayOfMonth.getFullYear();
  const month = ("0" + (lastDayOfMonth.getMonth() + 1)).slice(-2);
  const day = ("0" + lastDayOfMonth.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

export function getColor(mahnung: number) {
  if (mahnung >= 3) {
    return "#FF0000";
  } else if (mahnung === 2) {
    return "#FF9900";
  } else if (mahnung === 1) {
    return "#DDFF00";
  } else {
    return undefined;
  }
}
export function getColorWithOpacity(mahnung: number) {
  const color = getColor(mahnung);
  if (color) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  } else {
    return `rgba(0, 0, 0, 0.2)`;
  }
}

export function changeColorIconButtonPaid(status: string) {
  // if (status === "P") {
  //   return "success";
  // } else 
  if (status === "D") {
    return "primary";
  } else if (status === "S") {
    return "warning";
  } else if (status === "E") {
    return "error";
  }
  return "inherit";
  //"default" | "error" | "inherit" | "primary" | "secondary" | "info" | "success" | "warning"
}
