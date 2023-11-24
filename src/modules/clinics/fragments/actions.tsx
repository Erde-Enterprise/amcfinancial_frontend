import { IconButton } from "@mui/material";
import { useState } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
import useClinic from "../hooks/use-clinics";
import CustomTooltip from "../../dashboard/components/table/custom-tooltip/Custom-Tooltip";
import ConfirmDialog from "../../../components/modal/custom-dialog";

export function Actions(clinic_name: string) {
  const [open, setOpen] = useState<boolean>(false);
  const {getAllClinics, deleteClinic} = useClinic();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = async () => {
    await deleteClinic(clinic_name)
      .then(async () => {
        await getAllClinics();
      })
      .then(() => {
        handleClose();
      });
  };
  
  return (
    <>
      {/* <CustomTooltip title="Update">
        <IconButton
          sx={{ color: `${invoice.clinic.color}` }}
          onClick={handleOpen}
          disableRipple
        >
          <SaveAsIcon />
        </IconButton>
      </CustomTooltip> */}
      <CustomTooltip title="Delete">
        <IconButton
          color="error"
          onClick={ () => {
            //console.log(invoice);
            handleOpen();
          }}
        >
          <DeleteForeverIcon />
        </IconButton>
      </CustomTooltip>
      <ConfirmDialog
        open={open}
        onClose={handleClose}
        onClickYes={handleYes}
        text="Confirm?"
      />
      {/* <CustomModal open={open} title="Update" handleClose={handleClose}>
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
      </CustomModal> */}
    </>
  );
}
