import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import CustomTable from "./custom-table/Custom-React-Table";
import { MRT_ColumnDef, MRT_RowSelectionState } from "material-react-table";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import {
  getColor,
  getColorWithOpacity,
  getFirstDayOfMonth,
  getRandomPhrase,
  getToday,
  styleMenuItem,
} from "../../utils/utils";
import AuthContext from "../../../../auth/auth";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useDashboard from "../../hooks/use-dashboard";
import { InvoiceEntity, InvoiceRowsEntity } from "../../model/dashboard.entity";
import { getValueFromKey } from "../../../../utils/utils";
import { StatusInvoiceEnum } from "../../features/add-invoice/enum/add-invoice.enum";
import { CustomTypeEnum } from "../../../../components/inputs/enum/type.enum";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Actions } from "../fragments/actions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { snackActions } from "../../../../utils/notification/snackbar-util";
import SearchInvoice from "../fragments/search";

export function Table() {
  const { user } = useContext(AuthContext);
  const {
    goToAddInvoice,
    getInvoices,
    invoices,
    loading,
    deleteInvoice,
    downloadInvoice,
  } = useDashboard();
  const [data, setData] = useState<InvoiceRowsEntity[]>([]);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [invoicesDeleted, setInvoicesDeleted] = useState<string[]>([]);
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "rechnung",
        header: "Rechnung",
        maxSize: 400,
        size: 80,
        minSize: 20,
        id: "rechnung",
        columnDefType: "data",
        _filterFn: "contains",
      },
      {
        accessorKey: "name",
        header: "Name",
        maxSize: 400,
        size: 80,
        minSize: 20,
        id: "name",
        columnDefType: "data",
        _filterFn: "contains",
      },
      {
        accessorKey: "price",
        header: "Price",
        maxSize: 400,
        size: 80,
        minSize: 20,
        id: "price",
        columnDefType: "data",
        _filterFn: "contains",
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        maxSize: 400,
        size: 80,
        minSize: 20,
        id: "dueDate",
        columnDefType: "data",
        _filterFn: "contains",
        GroupedCell: ({ cell, row }: any) => (
          <>
            <span style={{ color: getColor(Number(row.original.mahnung)) }}>
              <b>{cell.getValue()}</b> ({cell.row.leafRows.length})
            </span>
          </>
        ),
      },
      {
        accessorKey: "mahnung",
        header: "Mahnung",
        maxSize: 400,
        size: 80,
        minSize: 20,
        id: "mahnung",
        columnDefType: "data",
        _filterFn: "contains",
        GroupedCell: ({ cell, row }: any) => (
          <>
            <Box
              style={{
                border: "1px",
                backgroundColor: getColorWithOpacity(
                  Number(row.original.mahnung)
                ),
              }}
              sx={{ width: "25%" }}
            >
              <span style={{ color: getColor(Number(row.original.mahnung)) }}>
                <b>{cell.getValue()}</b> ({cell.row.leafRows.length})
              </span>
            </Box>
          </>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        maxSize: 400,
        size: 80,
        minSize: 20,
        id: "description",
        columnDefType: "data",
        _filterFn: "contains",
      },
      {
        accessorKey: "issuedOn",
        header: "Issued On",
        maxSize: 400,
        size: 80,
        minSize: 20,
        id: "issuedOn",
        columnDefType: "data",
        _filterFn: "contains",
      },
      {
        accessorKey: "status",
        header: "Status",
        maxSize: 400,
        size: 80,
        minSize: 20,
        id: "status",
        columnDefType: "data",
        _filterFn: "contains",
      },
      {
        accessorKey: "type",
        header: "Type",
        maxSize: 400,
        size: 45,
        minSize: 20,
        id: "type",
        columnDefType: "data",
        _filterFn: "contains",
      },
      {
        accessorKey: "clinic",
        header: "Clinuc",
        maxSize: 400,
        size: 50,
        minSize: 20,
        id: "clinic",
        columnDefType: "data",
        _filterFn: "contains",
        Cell: ({ row }) => (
          <>
            <IconButton size="small" disableRipple disableTouchRipple>
              <FiberManualRecordIcon
                sx={{ color: `${row.original.color}` }}
                fontSize="small"
              />
            </IconButton>
            {row.original.clinic}
          </>
        ),
      },
      {
        accessorKey: "attachment",
        header: "Attachment",
        maxSize: 400,
        size: 80,
        minSize: 20,
        id: "attachment",
        columnDefType: "data",
        _filterFn: "contains",
        Cell: ({ row }) => (
          <Box sx={{ height: "10%", width: "10%" }}>
            <Button
              onClick={async () => {
                await downloadInvoice(row.original.rechnung, row.original.name);
              }}
              size="small"
              sx={{
                fontSize: "0.5rem", // Ajuste o tamanho da fonte aqui
                //padding: "3px 6px", // Ajuste o preenchimento aqui
              }}
              startIcon={
                <AttachFileIcon
                  sx={{
                    color: `${row.original.color}`,
                    fontSize: "0.5rem", // Ajuste o tamanho da fonte aqui
                    padding: "1px 6px",
                  }}
                  fontSize="small"
                />
              }
            >
              Download
            </Button>
          </Box>
        ),
      },
    ],
    []
  );
  useEffect(() => {
    getInvoices(getFirstDayOfMonth(), getToday());
  }, []);

  useLayoutEffect(() => {
    if (Array.isArray(invoices)) {
      setData(
        invoices.map((item: InvoiceEntity) => ({
          rechnung: item.invoice_number,
          name: item.title,
          price: item.amount,
          dueDate: item.due_date,
          mahnung: item.reminder,
          description: item.description,
          issuedOn: item.issue_date,
          attachment: "",
          status: getValueFromKey(item.status, StatusInvoiceEnum),
          type: getValueFromKey(item.type, CustomTypeEnum),
          clinic: item.clinic.name,
          color: item.clinic.color,
          invoice: item,
        }))
      );
    }
  }, [invoices]);

  useEffect(() => {
    let arr = {} as MRT_RowSelectionState;
    data.forEach((item, index: number) => {
      if (item.checked === true) {
        arr = { ...arr, [index]: item.checked };
      }
    });
    setRowSelection(arr);
  }, [invoices]);

  useEffect(() => {
    const rechungsSelecteds: string[] = [];
    Object.keys(rowSelection).forEach((index) => {
      const item = data[parseInt(index)];
      if (item && Object.keys(item).length !== 0) {
        rechungsSelecteds.push(item.rechnung);
      }
    });
    setInvoicesDeleted(rechungsSelecteds);
  }, [rowSelection]);

  const handleManyDelets = async () => {
    if (invoicesDeleted.length === 0) {
      snackActions.warning("Please select one or more itens");
      return;
    }
    await deleteInvoice(invoicesDeleted).then(() => {
      const newData = data.filter(
        (item) => !invoicesDeleted.includes(item.rechnung)
      );
      setData(newData);
    });
  };
  return (
    <Grid container alignItems={"center"} spacing={1} flexDirection={"column"}>
      <Box mb={0.5}>
        <Grid item>
          <h3>Welcome, {user?.name}</h3>
        </Grid>
      </Box>
      <Box mb={3}>
        <Grid item sx={styleMenuItem}>
          {getRandomPhrase()}
        </Grid>
      </Box>
      <Box mb={1}>
        <Grid item>
          <SearchInvoice />
        </Grid>
      </Box>
      <Box mb={0.1}>
        <Grid item>
          <Button
            onClick={handleManyDelets}
            endIcon={<DeleteForeverIcon fontSize="small" />}
            color="error"
          >
            Delete
          </Button>
          {/* <Button
            endIcon={<DeleteForeverIcon fontSize="small" />}
            color="warning"
          >
            Update
          </Button> */}
          <Button
            endIcon={<PlaylistAddCircleIcon fontSize="small" />}
            color="primary"
            onClick={() => {
              goToAddInvoice();
            }}
          >
            Insert
          </Button>
        </Grid>
      </Box>
      <Box mb={0.1}>
        <Grid item>
          <CustomTable
            state={{ rowSelection: { ...rowSelection } }}
            onRowSelectionChange={setRowSelection}
            loading={loading}
            title="Invoices"
            columns={columns}
            data={data}
            containerProps={{
              sx: {
                maxHeight: "60vh",
                minHeight: "55vh",
                minWidth: "75%",
                flex: 1,
              },
            }}
            displayColumnDefOptions={{
              "mrt-row-actions": {
                size: 20,
                minSize: 10,
                maxSize: 40,
                enableColumnActions: false,
                enableHiding: false,
              },
              "mrt-row-select": {
                enableColumnActions: false,
                enableHiding: false,
                size: 20,
                minSize: 5,
                maxSize: 20,
              },
              "mrt-row-expand": {
                size: 40,
                minSize: 10,
                maxSize: 40,
              },
            }}
            initialState={{ grouping: ["mahnung", "dueDate"], expanded: true }}
            cellFontSizeInBody={"0.5rem"}
            headerCellFontSize={"0.6rem"}
            actions={({ row }) => Actions(row.original.invoice)}
          />
        </Grid>
      </Box>
    </Grid>
  );
}
