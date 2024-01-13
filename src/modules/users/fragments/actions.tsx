import { IconButton } from "@mui/material";
import { useState } from "react";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CustomTooltip from "../../dashboard/components/table/custom-tooltip/Custom-Tooltip";
import useUser from "../hooks/use-users";
import ConfirmDialog from "../../../components/modal/custom-dialog";
import { CustomModal } from "../../../components/modal/custom-modal";
import { UserModalUpdateForm } from "./user-modal-form";

export function Actions(row: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const { getAllUsers, deleteUser } = useUser();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = async () => {
    await deleteUser(row.original.nickname)
      .then(async () => {
        await getAllUsers();
      })
      .then(() => {
        handleClose();
      });
  };
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  return (
    <>
      <CustomTooltip title="Aktualisieren">
        <IconButton
          // sx={{ color: `${invoice.clinic.color}` }}
          onClick={handleOpenUpdate}
          disableRipple
        >
          <DriveFileRenameOutlineRoundedIcon color="primary" />
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
        text="Bestätigen?"
      />
        <CustomModal open={openUpdate} title="Aktualisieren" handleClose={handleCloseUpdate}>
          <UserModalUpdateForm
            email={row.original.email}
            name={row.original.name}
            nickname={row.original.nickname}
            new_nickname={row.original.nickname}
            photo={row.original.photo}
            type={row.original.type}
            password=""
          />
        </CustomModal>

    </>
  );
}
