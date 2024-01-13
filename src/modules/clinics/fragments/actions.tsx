import { IconButton } from "@mui/material";
import { useState } from "react";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
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
    
    await deleteClinic(row.original.name)
      .then(async () => {
        await getAllClinics();
      })
      .then(() => {
        handleClose();
      });
  };

  return (
    <>
      <CustomTooltip title="Aktualisieren">
        <IconButton
          onClick={handleOpenUpdate}
          color="primary"
          disableRipple
        >
          <DriveFileRenameOutlineRoundedIcon />
        </IconButton>
      </CustomTooltip>
      <CustomTooltip title="Löschen">
        <IconButton
          color="error"
          onClick={() => {
            //console.log(invoice);
            handleOpen();
          }}
        >
          <DeleteRoundedIcon />
        </IconButton>
      </CustomTooltip>
      <ConfirmDialog
        open={open}
        onClose={handleClose}
        onClickYes={handleYes}
        text="Bestätigen Sie?"
      />
      <CustomModal
        open={openUpdate}
        title="Aktualisieren"
        handleClose={handleCloseUpdate}
        sx={{width:"45%", height:"50%"}}
      >
        <ClinicsModalFormUpdate
          name={row.original.name}
          color={row.original.color}
        />
      </CustomModal>
    </>
  );
}
