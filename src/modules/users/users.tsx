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
import { UserEntity, UserInsertEntity, UserRowEntity } from "./model/user.entity";
import AttachFileIcon from "@mui/icons-material/AttachFile";
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

export function UsersPage() {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { registerUser, user, getAllUsers } = useUsers();
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState<UserRowEntity[]>([]);
  const [newUser, setNewUser] = useState<UserInsertEntity>({
    email: "",
    nickname: "",
    name: "",
    photo: undefined,
    type: 1,
    password: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await registerUser(newUser).then(async () => {
      await getAllUsers();
    }).then(()=>{
      handleReset();
    });
    
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const hadleSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setNewUser((prevState) => ({
      ...prevState,
      photo: file,
    }));
    if (file) {
      setFileName(file.name);
    }
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };
  const handleReset = () => {
    setNewUser({
      email: "",
      nickname: "",
      name: "",
      photo: undefined,
      type: 1,
      password: "",
    });
    setConfirmPassword("");
    setFileName("");
  };
  const types: string[] = ["1", "2"];

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

  // useLayoutEffect(() => {
  //   const base64Response = item.photo;
  //   const fileType = item.mime_type; 
  //   const fileBlob = base64ToBlob(base64Response, fileType);
  //   const url = URL.createObjectURL(fileBlob);
  //   if (Array.isArray(user?.users)) {
  //     setData(
  //       user?.users?.map((item: UserEntity, index: number) => ({
  //         id: ++index,
  //         email: item.email,
  //         name: item.name,
  //         nickname: item.nickname,
  //         photo: item.photo,
  //         type: item.type,
  //       })) as UserEntity[]
  //     );
  //   }
  // }, [user?.users]);
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
    <Grid container direction={"column"} spacing={2}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column" alignItems="center">
            {fileName && <p>Arquivo selecionado: {fileName}</p>}
            <Grid item>
              <Button
                variant="outlined"
                endIcon={<AttachFileIcon fontSize="small" />}
                component="label"
              >
                Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  hidden
                />
              </Button>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={5}>
                <TextField
                  variant="filled"
                  label="Name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  variant="filled"
                  label="Nickname"
                  name="nickname"
                  value={newUser.nickname}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={2}>
                <Select
                  variant="filled"
                  label="Type"
                  name="type"
                  id="type"
                  value={newUser.type.toString()}
                  onChange={hadleSelect}
                  required
                >
                  {types.map((item, index: number) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ width: "100%" }}>
              <TextField
                variant="filled"
                label="Email"
                name="email"
                value={newUser.email}
                error={newUser.email !== "" && !validateLogin(newUser.email)}
                onChange={handleInputChange}
                fullWidth
                required
                helperText={
                  newUser.email !== "" && !validateLogin(newUser.email)
                    ? "Invalid email format"
                    : ""
                }
              />
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <Box>
                  <TextField
                    variant="filled"
                    label="Password"
                    name="password"
                    type="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    error={
                      newUser.password !== "" &&
                      !validatePassword(newUser.password)
                    }
                    required
                  />
                  <FormHelperText
                    style={{ whiteSpace: "pre-line" }}
                    error={
                      newUser.password !== "" &&
                      !validatePassword(newUser.password)
                    }
                  >
                    {newUser.password !== "" &&
                    !validatePassword(newUser.password)
                      ? `Password too small`
                      : ""}
                  </FormHelperText>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="filled"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={!passwordsMatch(newUser.password, confirmPassword)}
                  helperText={
                    !passwordsMatch(newUser.password, confirmPassword)
                      ? "Passwords don't match"
                      : ""
                  }
                  required
                />
              </Grid>
            </Grid>
            <Grid item>
              <CancelButtonFormToDashboard />
              <ResetButtonForm handleReset={handleReset} />
              <SubmitButtonForm />
            </Grid>
          </Grid>
        </form>
        <Grid item xs={12}>
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
    </Grid>
  );
}
