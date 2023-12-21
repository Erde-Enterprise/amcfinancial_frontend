import { IconButton } from "@mui/material";
import CustomTooltip from "../table/custom-tooltip/Custom-Tooltip";
import { useContext, useState } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { CustomModal } from "../../../../components/modal/custom-modal";
import { DashBoardModal } from "./dashboard-form";
import { InvoiceEntity, InvoiceRowsEntity } from "../../model/dashboard.entity";
import { StatusInvoiceEnum } from "../../features/add-invoice/enum/add-invoice.enum";
import { getKeyFromValue, getValueFromKey } from "../../../../utils/utils";
import { CustomTypeEnum } from "../../../../components/inputs/enum/type.enum";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useDashboard from "../../hooks/use-dashboard";
import UpdateIcon from "@mui/icons-material/Update";
import PaidIcon from "@mui/icons-material/Paid";
import ConfirmDialog from "../../../../components/modal/custom-dialog";
import {
  changeColorIconButtonPaid,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from "../../utils/utils";
import AuthContext from "../../../../auth/auth";

export function Actions(invoice: InvoiceEntity) {
  const [open, setOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [paidConfirm, setPaidConfirm] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { deleteInvoice, getInvoices, updateInvoice } = useDashboard();
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
  const handleOpenPaidConfirm = () => {
    setPaidConfirm(true);
  };
  const handleClosePaidConfirm = () => {
    setPaidConfirm(false);
  };
  const handleDelete = async () => {
    const arrInvoice: string[] = [];
    arrInvoice.push(invoice.invoice_number);
    await deleteInvoice(arrInvoice)
      .then(() => {
        handleCloseConfirm();
      })
      .then(async () => {
        await getInvoices(getFirstDayOfMonth(), getLastDayOfMonth());
      });
  };

  const handlePaid = async () => {
    await updateInvoice({
      amount: invoice.amount,
      attachment: new File([""], ""),
      description: invoice.description,
      due_date: invoice.due_date,
      invoice_number: invoice.invoice_number,
      issue_date: invoice.due_date,
      name_clinic: invoice.clinic.name,
      new_invoice_number: "",
      reminder: invoice.reminder,
      status: "P",
      title: invoice.title,
      type: getKeyFromValue(invoice.type, CustomTypeEnum),
      scheduled_date: invoice.scheduled_date,
    }).then(async () => {
      await getInvoices(getFirstDayOfMonth(), getLastDayOfMonth());
    });
    handleClosePaidConfirm();
  };

  return (
    <>
      <CustomTooltip title="Aktualisieren">
        <IconButton
          sx={{
            color: `${invoice.clinic.color}`,
            minWidth: "15px !important",
            padding: "3px",
          }}
          onClick={handleOpen}
          disableRipple
        >
          <SaveAsIcon />
        </IconButton>
      </CustomTooltip>
      {user?.type !== 0 ? undefined : (
        <CustomTooltip title="Löschen">
          <IconButton
            sx={{ minWidth: "15px !important", padding: "3px" }}
            color="error"
            onClick={() => {
              //console.log(invoice);
              handleOpenConfirm();
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </CustomTooltip>
      )}
      {user?.type === 1 || invoice.status === "P" ? undefined : (
        <CustomTooltip title="Zahlung">
          <IconButton
            sx={{ minWidth: "15px !important", padding: "3px" }}
            color={changeColorIconButtonPaid(invoice.status)}
            onClick={() => {
              //console.log(invoice);
              handleOpenPaidConfirm();
            }}
          >
            <PaidIcon />
          </IconButton>
        </CustomTooltip>
      )}

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
          scheduledDate={invoice.scheduled_date as string}
        />
      </CustomModal>
      <ConfirmDialog
        open={confirm}
        onClose={handleCloseConfirm}
        onClickYes={handleDelete}
        text="Bestätigen Sie?"
      />
      <ConfirmDialog
        open={paidConfirm}
        onClose={handleClosePaidConfirm}
        onClickYes={handlePaid}
        text="Bestätigen Sie die Zahlung?"
      />
    </>
  );
}
