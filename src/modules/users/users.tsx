import {
  Button,
  Grid,
  TextField,
  FormHelperText,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  Avatar,
} from "@mui/material";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import {
  UserEntity,
  UserInsertEntity,
  UserRowEntity,
} from "./model/user.entity";
import { snackActions } from "../../utils/notification/snackbar-util";
import { validateLogin, validatePassword } from "../login/utils/utils";
import { base64ToBlob, passwordsMatch } from "./utils/utils";
import { CancelButtonFormToDashboard } from "../../components/header/buttons/Cancel-Form-Button";
import { ResetButtonForm } from "../../components/header/buttons/Reset-Form-Button";
import { SubmitButtonForm } from "../../components/header/buttons/Submit-Form-Button";
import useUsers from "./hooks/use-users";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import CustomTable from "../dashboard/components/table/custom-table/Custom-React-Table";
import { MRT_ColumnDef } from "material-react-table";
import { Actions } from "./fragments/actions";
import { CustomModal } from "../../components/modal/custom-modal";
import { UserModalFormInsert } from "./fragments/user-modal-form-insert";

export function UsersPage() {
  const { user, getAllUsers } = useUsers();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [data, setData] = useState<UserRowEntity[]>([]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        maxSize: 200,
        size: 10,
        minSize: 10,
      },
      {
        accessorKey: "photo",
        header: "Photo",
        maxSize: 200,
        size: 30,
        minSize: 10,
        Cell: ({ row }) => (
          <>
            <Avatar
              alt={row.original.name}
              src={row.original.photo}
              style={{ border: "none" }}
            />
          </>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        maxSize: 200,
        size: 70,
        minSize: 10,
      },
      {
        accessorKey: "nickname",
        header: "Nickname",
        maxSize: 200,
        size: 35,
        minSize: 10,
      },
      {
        accessorKey: "type",
        header: "Type",
        maxSize: 200,
        size: 25,
        minSize: 10,
      },
      {
        accessorKey: "email",
        header: "Email",
        maxSize: 200,
        size: 60,
        minSize: 10,
      },
    ],
    []
  );
  useEffect(() => {
    getAllUsers();
  }, []);

  useLayoutEffect(() => {
    if (Array.isArray(user?.users)) {
      setData(
        user?.users?.map((item: UserEntity, index: number) => {
          const base64Response = item.photo as unknown as string;
          const fileType = item.mime_type;
          const fileBlob = base64ToBlob(base64Response, fileType);
          const url = URL.createObjectURL(fileBlob);
          return {
            id: ++index,
            email: item.email,
            name: item.name,
            nickname: item.nickname,
            photo: url,
            type: item.type,
          };
        }) as UserRowEntity[]
      );
    }
  }, [user?.users]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12} alignItems={"center"} justifyContent={"center"}>
        <CancelButtonFormToDashboard />
        <Button
          endIcon={<PlaylistAddCircleIcon fontSize="small" />}
          color="primary"
          onClick={handleOpen}
        >
          Insert
        </Button>
        <CustomModal open={open} title="Insert" handleClose={handleClose}>
          <UserModalFormInsert handleClose={handleClose}/>
        </CustomModal>
        <CustomTable
          title="Users"
          loading={user?.loading}
          data={data}
          columns={columns}
          disableRowSelection
          actions={({ row }) => Actions(row)}
        />
      </Grid>
    </Grid>
  );
}
