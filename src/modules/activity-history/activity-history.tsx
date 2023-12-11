import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useState } from "react";
import { ActivityHistoric } from "./model/activity-historic.entity";
import { Avatar, Grid } from "@mui/material";
import CustomTable from "../dashboard/components/table/custom-table/Custom-React-Table";

export function ActivityHistoryPage() {
  const [data, setData] = useState<ActivityHistoric[]>([]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        maxSize: 200,
        size: 10,
        minSize: 10,
      },      {
        accessorKey: "photo",
        header: "Photo",
        maxSize: 200,
        size: 30,
        minSize: 10,
        Cell: ({ row }) => (
          <>
            <Avatar
              alt={row.original.userLogin}
              src={row.original.photo}
              style={{ border: "none" }}
            />
          </>
        ),
      },
      {
        accessorKey: "userLogin",
        header: "User Login",
        maxSize: 200,
        size: 60,
        minSize: 10,
      },
      {
        accessorKey: "accessDateTime",
        header: "Last Access",
        maxSize: 200,
        size: 60,
        minSize: 10,
      },
      {
        accessorKey: "geoLocation",
        header: "Location",
        maxSize: 200,
        size: 40,
        minSize: 10,
      },
    ],
    []
  );
  return (
    <Grid container spacing={1}>
      <Grid item>
        <CustomTable
          title="List Last Access"
          //loading={clinic?.loading}
          data={data}
          columns={columns}
          disableRowSelection
          //actions={({ row }) => Actions(row)}
        ></CustomTable>
      </Grid>
    </Grid>
  );
}
