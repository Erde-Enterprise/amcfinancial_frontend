import { useMemo } from "react";
import CustomTable from "./custom-table/Custom-React-Table";
import { MRT_ColumnDef } from "material-react-table";

export function Table() {
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
        GroupedCell: ({ cell }: any) => (
          <>
            <span>
              <b>{cell.getValue()}</b> ({cell.row.leafRows.length})
            </span>
          </>
        ),
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
        accessorKey: "attachment",
        header: "Attachment",
        maxSize: 400,
        size: 80,
        minSize: 20,
        id: "attachment",
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
        size: 80,
        minSize: 20,
        id: "type",
        columnDefType: "data",
        _filterFn: "contains",
      },
      {
        accessorKey: "clinic",
        header: "Clinuc",
        maxSize: 400,
        size: 80,
        minSize: 20,
        id: "clinic",
        columnDefType: "data",
        _filterFn: "contains",
      },
    ],
    []
  );
  return (
    <>
      <CustomTable
        title=""
        columns={columns}
        data={[]}
        containerProps={{
          sx: { maxHeight: "55vh", minHeight: "45vh", minWidth: "1700px" },
        }}
        displayColumnDefOptions={{
          "mrt-row-actions": {
            size: 20,
            minSize: 10,
            maxSize: 30,
            enableColumnActions: false,
            enableHiding: false,
          },
          "mrt-row-select": {
            enableColumnActions: false,
            enableHiding: false,
            size: 5,
            minSize: 5,
            maxSize: 5,
          },
          "mrt-row-expand": {
            size: 10,
            minSize: 10,
            maxSize: 10,
          },
        }}
        initialState={{ grouping: ["rechnung"], expanded: true }}
        cellFontSizeInBody={"0.5rem"}
        headerCellFontSize={"0.6rem"}
      />
    </>
  );
}
