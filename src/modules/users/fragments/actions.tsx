import { IconButton } from "@mui/material";
import { useState } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
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
      <CustomTooltip title="Update">
        <IconButton
          // sx={{ color: `${invoice.clinic.color}` }}
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
        <CustomModal open={openUpdate} title="Update" handleClose={handleCloseUpdate}>
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
