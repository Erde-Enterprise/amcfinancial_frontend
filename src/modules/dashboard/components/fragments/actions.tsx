import { IconButton } from "@mui/material";
import CustomTooltip from "../table/custom-tooltip/Custom-Tooltip";
import { useState } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { CustomModal } from "../../../../components/modal/custom-modal";
import { DashBoardModal } from "./dashboard-form";
import { InvoiceEntity, InvoiceRowsEntity } from "../../model/dashboard.entity";
import { StatusInvoiceEnum } from "../../features/add-invoice/enum/add-invoice.enum";
import { getValueFromKey } from "../../../../utils/utils";
import { CustomTypeEnum } from "../../../../components/inputs/enum/type.enum";

export function Actions(invoice: InvoiceEntity) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CustomTooltip title="Update">
        <IconButton onClick={handleOpen} disableRipple>
          <SaveAsIcon />
        </IconButton>
      </CustomTooltip>
      <CustomModal open={open} title="Update" handleClose={handleClose}>
        <DashBoardModal
          handleCancel={handleClose}
          attachment={new File([""], "")}
          clinic={invoice.clinic.name}
          description={invoice.description}
          dueDate={invoice.due_date}
          issuedOn={invoice.issue_date}
          mahnung={invoice.reminder}
          name={invoice.title}
          price={invoice.amount}
          rechnung={invoice.invoice_number}
          status={getValueFromKey(invoice.status, StatusInvoiceEnum)}
          type={getValueFromKey(invoice.type, CustomTypeEnum)}
        />
      </CustomModal>
    </>
  );
}
