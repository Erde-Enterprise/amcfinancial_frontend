import {
  Grid,
  Avatar,
  IconButton,
} from "@mui/material";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import {
  UserEntity,
  UserRowEntity,
} from "./model/user.entity";
import { base64ToBlob } from "./utils/utils";
import useUsers from "./hooks/use-users";
import {
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
        header: "Spitzname",
        maxSize: 200,
        size: 35,
        minSize: 10,
      },
      {
        accessorKey: "type",
        header: "Typ",
        maxSize: 200,
        size: 25,
        minSize: 10,
      },
      {
        accessorKey: "email",
        header: "E-mail",
        maxSize: 200,
        size: 60,
        minSize: 10,
      },
    ],
    []
  );
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
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
    <Grid container direction="column" spacing={2} alignItems={"center"}>
      <Grid item alignItems={"flex-start"} justifyContent={"flex-start"}>
        <IconButton
          color="primary"
          onClick={handleOpen}
        ><AddBoxRoundedIcon fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item xs={6}>
      <CustomTable
          title="Users"
          loading={user?.loading}
          data={data}
          columns={columns}
          disableRowSelection
          actions={({ row }) => Actions(row)}
        />
      </Grid>
      <CustomModal open={open} title="Neuen Benutzer registrieren" handleClose={handleClose}>
          <UserModalFormInsert handleClose={handleClose}/>
        </CustomModal>
    </Grid>
  );
}
