import { IconButton } from "@mui/material";
import { useState } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
import useClinic from "../hooks/use-clinics";
import CustomTooltip from "../../dashboard/components/table/custom-tooltip/Custom-Tooltip";
import ConfirmDialog from "../../../components/modal/custom-dialog";
import { CustomModal } from "../../../components/modal/custom-modal";
import { ClinicsModalFormUpdate } from "./clinics-modal-form-update";

export function Actions(row: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const { getAllClinics, deleteClinic } = useClinic();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleYes = async () => {
    await deleteClinic(row.original.clinic_name)
      .then(async () => {
        await getAllClinics();
      })
      .then(() => {
        handleClose();
      });
  };

  return (
    <>
      <CustomTooltip title="Update">
        <IconButton
          //sx={{ color: `${invoice.clinic.color}` }}
          onClick={handleOpenUpdate}
          disableRipple
        >
          <SaveAsIcon />
        </IconButton>
      </CustomTooltip>
      <CustomTooltip title="Delete">
        <IconButton
          color="error"
          onClick={() => {
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
      <CustomModal
        open={openUpdate}
        title="Update"
        handleClose={handleCloseUpdate}
      >
        <ClinicsModalFormUpdate
          name={row.original.name}
          color={row.original.color}
        />
      </CustomModal>
    </>
  );
}
