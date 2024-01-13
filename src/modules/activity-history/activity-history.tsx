import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { ActivityHistoricRowEntity } from "./model/activity-historic.entity";
import { Grid } from "@mui/material";
import CustomTable from "../dashboard/components/table/custom-table/Custom-React-Table";
import useActivityHistory from "./hooks/use-activity-history";
import { transformDateFormat } from "../../utils/utils";

export function ActivityHistoryPage() {
  const [data, setData] = useState<ActivityHistoricRowEntity[]>([]);
  const { historic, getAllHistoric, loading } = useActivityHistory();

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
        accessorKey: "user_nickname",
        header: "Benutzer",
        maxSize: 200,
        size: 60,
        minSize: 10,
      },
      {
        accessorKey: "login_date",
        header: "Datum",
        maxSize: 200,
        size: 60,
        minSize: 10,
      },
      {
        accessorKey: "login_time",
        header: "Zeit",
        maxSize: 200,
        size: 60,
        minSize: 10,
      },
      {
        accessorKey: "location",
        header: "Lokal",
        maxSize: 200,
        size: 40,
        minSize: 10,
      },
      {
        accessorKey: "status",
        header: "Status",
        maxSize: 200,
        size: 50,
        minSize: 10,
        Cell: ({ row, renderedCellValue }) => (
          <>
            <span
              style={{
                color:
                  row.original.status === "NICHTERLAUBT"
                    ? "#B60000"
                    : "#36C95B",
                fontWeight: "600",
              }}
            >
              {renderedCellValue}
            </span>
          </>
        ),
      },
    ],
    []
  );
  
  useEffect(() => {
    getAllHistoric();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (Array.isArray(historic)) {
      setData(
        historic.map((item, index: number) => ({
          id: ++index,
          location: item.location,
          login_date: transformDateFormat(item.login_date),
          login_time: item.login_time,
          status: item.status === true ? "ERLAUBT" : "NICHTERLAUBT",
          user_nickname: item.user_nickname,
        }))
      );
    }
  }, [historic]);
  return (
    <Grid container spacing={1}>
      <Grid item>
        <CustomTable
          title="List Last Access"
          loading={loading}
          data={data}
          columns={columns}
          disableRowSelection
        ></CustomTable>
      </Grid>
    </Grid>
  );
}
