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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useDashboard from "../../hooks/use-dashboard";
import UpdateIcon from "@mui/icons-material/Update";
import ConfirmDialog from "../../../../components/modal/custom-dialog";
import { getFirstDayOfMonth, getToday } from "../../utils/utils";

export function Actions(invoice: InvoiceEntity) {
  const [open, setOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const { deleteInvoice, getInvoices } = useDashboard();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenConfirm = () => {
    setConfirm(true);
  };
  const handleCloseConfirm = () => {
    setConfirm(false);
  };
  const handleDelete = async () => {
    const arrInvoice: string[] = [];
    arrInvoice.push(invoice.invoice_number);
    await deleteInvoice(arrInvoice).then(()=>{
      handleCloseConfirm();
    }).then(async ()=>{await getInvoices(getFirstDayOfMonth(), getToday());});
  };
  
  return (
    <>
      <CustomTooltip title="Update">
        <IconButton
          sx={{ color: `${invoice.clinic.color}` }}
          onClick={handleOpen}
          disableRipple
        >
          <SaveAsIcon />
        </IconButton>
      </CustomTooltip>
      <CustomTooltip title="Delete">
        <IconButton
          color="error"
          onClick={ () => {
            //console.log(invoice);
            handleOpenConfirm();
          }}
        >
          <DeleteForeverIcon />
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
      <ConfirmDialog
        open={confirm}
        onClose={handleCloseConfirm}
        onClickYes={handleDelete}
        text="Confirm?"
      />
    </>
  );
}
