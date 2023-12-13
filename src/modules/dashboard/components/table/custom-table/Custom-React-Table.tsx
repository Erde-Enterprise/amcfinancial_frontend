import { Box, Button } from "@mui/material";
import {
  MRT_Row,
  MaterialReactTable,
  MRT_BottomToolbar as BottomToolbar,
  MRT_ColumnDef,
} from "material-react-table";
import { memo, useContext, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import { ExportToCsv } from "export-to-csv-fix-source-map";
import { BsFiletypeCsv, BsFiletypePdf, BsFiletypeXlsx } from "react-icons/bs";
import CustomGridCell from "../custom-gridcell/CustomGridCell";
import AuthContext from "../../../../../auth/auth";
export interface CustomTableProps {
  state?: Object;
  columns: MRT_ColumnDef<any>[];
  data: any[];
  title: string;
  onRowSelectionChange?: any;
  formatDataToExcel?: (data: any[]) => any[];
  actions?: (row?: any, data?: any[]) => JSX.Element;
  muiTablePaperProps?: Object;
  bottomToolbar?: (table: any) => JSX.Element;
  containerProps?: Object;
  displayColumnDefOptions?: Object;
  initialState?: Object;
  loading?: boolean;
  renderDetailPanel?: (row?: any) => JSX.Element;
  cellFontSizeInBody?: string;
  headerCellFontSize?: string;
  topToolbarCustomActions?: () => any[];
  enableRowVirtualization?: boolean;
  tableInstanceRef?: any;
  disableRowSelection?: boolean;
  disableMultiRowSelection?: boolean;
  positionToolbarAlertBanner?: "top" | "bottom" | "none";
  sizeActionsCol?: number;
  sizeSelectCol?: number;
}

const isEqual = (
  previousProps: CustomTableProps,
  nextProps: CustomTableProps
) => {
  const resolve =
    previousProps.data === nextProps.data &&
    previousProps.loading === nextProps.loading &&
    previousProps.columns === nextProps.columns &&
    previousProps.state === nextProps.state;
  return resolve;
};

const CustomTable = memo((props: CustomTableProps) => {
  const { user } = useContext(AuthContext);
  const [showGenerate, setShowGenerate] = useState<number>(0);
  const { data } = props;
  const handleClick = () => {
    setShowGenerate(showGenerate === 0 ? 1 : 0);
  };
  const handleClose = () => {
    setShowGenerate(0);
  };

  const ref = useRef<any>(null);

  const exportToPdf = useReactToPrint({
    content: () => ref.current,
    pageStyle: `
        @page {
          size: a3;
        }
      `,
  });

  const optionsCsv = {
    title: props.title,
    filename: props.title,
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: props.columns.map((c) => c.header),
  };
  const csvExporter = new ExportToCsv(optionsCsv);

  const exportToCSV = (rows: MRT_Row<any>[]) => {
    if (props.formatDataToExcel === undefined) {
      csvExporter.generateCsv(rows.map((row) => row.original));
    } else {
      const search = props.formatDataToExcel(rows.map((row) => row.original));
      csvExporter.generateCsv(search);
    }
    handleClose();
  };

  function exportToXLSX(rows: MRT_Row<any>[]) {
    if (props.formatDataToExcel === undefined) {
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(rows.map((row) => row.original));
      XLSX.utils.book_append_sheet(wb, ws);
      XLSX.writeFile(wb, `${props.title}.xlsx`);
    } else {
      const newData = props.formatDataToExcel(rows.map((row) => row.original));
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(newData);
      XLSX.utils.book_append_sheet(wb, ws);
      XLSX.writeFile(wb, `${props.title}.xlsx`);
    }
    handleClose();
  }

  props.columns.forEach((col) => {
    if (!col.Cell) {
      col.Cell = ({ renderedCellValue, row }) => (
        <CustomGridCell title={renderedCellValue as string}>
          {renderedCellValue}
        </CustomGridCell>
      );
    }
  });

  return (
    <Box ref={ref}>
      <MaterialReactTable
        state={{ isLoading: props.loading || false, ...props.state }}
        muiTableHeadProps={{ title: props.title }}
        columns={props.columns}
        data={props.data}
        globalFilterFn="contains"
        enableColumnActions={false}
        enableColumnFilters={user?.type !== 0 ? false : true}
        enablePagination={user?.type !== 0 ? false : true}
        enableSorting={user?.type !== 0 ? false : true}
        enableBottomToolbar={user?.type !== 0 ? false : true}
        enableTopToolbar={user?.type !== 0 ? false : true}
        enableRowActions={props.actions ? true : false}
        enableRowSelection={!props.disableRowSelection}
        enableMultiRowSelection={!props.disableMultiRowSelection}
        onRowSelectionChange={props.onRowSelectionChange}
        positionToolbarAlertBanner={props.positionToolbarAlertBanner ?? "top"}
        renderTopToolbarCustomActions={({ table }) => (
          <Box width={"auto"} display={"flex"}>
            <Box>
              <Button
                id="basic-button"
                onClick={handleClick}
                endIcon={<FileDownloadIcon />}
                style={{ color: "#A0A3BD", fontWeight: "bold" }}
              >
                Generate
              </Button>
            </Box>
            <Box
              sx={{
                transition: "opacity 0.25s ease-in-out",
                opacity: showGenerate,
                zIndex: showGenerate === 1 ? "auto" : "-999",
              }}
            >
              <Button
                onClick={() => {
                  if (table.getIsSomeRowsSelected()) {
                    exportToXLSX(table.getSelectedRowModel().rows);
                  } else if (
                    table.getPrePaginationRowModel().rows.length !== 0
                  ) {
                    exportToXLSX(table.getPrePaginationRowModel().rows);
                  } else if (table.getRowModel().rows.length !== 0) {
                    exportToXLSX(table.getRowModel().rows);
                  } else {
                    exportToXLSX(props.data);
                  }
                }}
                sx={{ color: "darkgreen" }}
              >
                <BsFiletypeXlsx size={25} />
              </Button>
              <Button
                onClick={() => {
                  exportToPdf();
                  handleClose();
                }}
                style={{ color: "red" }}
              >
                <BsFiletypePdf size={25} />
              </Button>
              <Button
                onClick={() => {
                  if (table.getIsSomeRowsSelected()) {
                    exportToCSV(table.getSelectedRowModel().rows);
                  } else if (
                    table.getPrePaginationRowModel().rows.length !== 0
                  ) {
                    exportToCSV(table.getPrePaginationRowModel().rows);
                  } else if (table.getRowModel().rows.length !== 0) {
                    exportToCSV(table.getRowModel().rows);
                  } else {
                    exportToCSV(props.data);
                  }
                }}
                style={{ color: "#78be67", textDecorationLine: "none" }}
              >
                <BsFiletypeCsv size={25} />
              </Button>
            </Box>
            <Box>
              {props.topToolbarCustomActions && props.topToolbarCustomActions()}
            </Box>
          </Box>
        )}
        renderRowActions={
          props.actions
            ? ({ row }) => (
                <Box key={row.index} sx={{ display: "flex" }}>
                  {props.actions!({ row, data })}
                </Box>
              )
            : undefined
        }
        displayColumnDefOptions={
          props.displayColumnDefOptions || {
            "mrt-row-actions": {
              size: props.sizeActionsCol ?? 12,
              minSize: props.sizeActionsCol ?? 12,
              maxSize: props.sizeActionsCol ?? 12,
              enableColumnActions: false,
              enableHiding: false,
            },
            "mrt-row-select": {
              enableColumnActions: false,
              enableHiding: false,
              size: props.sizeSelectCol ?? 5,
              minSize: props.sizeSelectCol ?? 5,
              maxSize: props.sizeSelectCol ?? 5,
            },
            "mrt-row-expand": {
              size: 10,
              maxSize: 10,
              minSize: 10,
            },
          }
        }
        enableGrouping
        initialState={{
          pagination: { pageSize: 50, pageIndex: 0 },
          density: "compact",
          ...props.initialState,
        }}
        muiTablePaginationProps={{
          rowsPerPageOptions:
            props.data.length <= 25
              ? [props.data.length]
              : props.data.length > 50
              ? [25, 50, { label: "All itens", value: props.data.length }]
              : [25, { label: "All itens", value: props.data.length }],
        }}
        muiTablePaperProps={
          props.muiTablePaperProps
            ? props.muiTablePaperProps
            : {
                sx: {
                  border: 1,
                  borderRadius: 5,
                  padding: "1em",
                  borderColor: "rgb(224, 224, 224)",
                  boxSizing: "border-box",
                  overflowX: "auto",
                  borderStyle: "none",
                },
                variant: "outlined",
                elevation: 0,
              }
        }
        enableColumnResizing
        muiSelectCheckboxProps={{
          size: "small",
        }}
        muiTableBodyCellProps={() => ({
          sx: {
            overflowWrap: "break-word",
            overflow: "visible",
            whiteSpace: "break-spaces",
            fontSize: props.cellFontSizeInBody
              ? props.cellFontSizeInBody
              : "0.875rem",
          },
        })}
        enableStickyHeader
        renderBottomToolbar={(table) => (
          <>
            {props.bottomToolbar ? (
              props.bottomToolbar(table)
            ) : (
              <BottomToolbar table={table.table} />
            )}
          </>
        )}
        muiTableContainerProps={
          props.containerProps ? props.containerProps : {}
        }
        enableColumnDragging={false}
        renderDetailPanel={props.renderDetailPanel}
        paginateExpandedRows={false}
        groupedColumnMode={"reorder"}
        muiTableHeadCellProps={() => ({
          sx: {
            fontSize: props.headerCellFontSize
              ? props.headerCellFontSize
              : "0.875rem",
          },
        })}
        enableRowVirtualization={props.enableRowVirtualization || false}
        tableInstanceRef={props.tableInstanceRef}
      />
    </Box>
  );
}, isEqual);

export default CustomTable;
