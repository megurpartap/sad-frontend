import { AiFillDelete } from "react-icons/ai";
import { CgMoreAlt } from "react-icons/cg";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "../ui/button";
import ActionButton from "../TableCells/ActionButton";
import ActiveSwitch from "../TableCells/ActiveSwitch";
import GetIdCardPage from "@/pages/GetIdCardPage";
// import { Card, Typography, Input } from "@material-tailwind/react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const columns = [
  {
    accessorFn: (row) => row.attributes.fullName,
    id: "fullName",
    header: () => <div className="text-center">Full Name</div>,
    cell: (props) => <p className="text-center">{props.getValue()}</p>,
  },
  {
    accessorFn: (row) => row.attributes.email,
    id: "email",
    header: () => <div className="text-center">Email-Id</div>,
    cell: (props) => <p className="text-center">{props.getValue()}</p>,
  },
  {
    accessorFn: (row) => row.attributes.adhaarNumber,
    id: "adhaarNumber",
    header: () => <div className="text-center">Adhaar Number</div>,
    cell: (props) => <p className="text-center">{props.getValue()}</p>,
  },
  {
    accessorFn: (row) => row.attributes.mobileNumber,
    id: "mobileNumber",
    header: () => <div className="text-center">Mobile Number</div>,
    cell: (props) => <p className="text-center">{props.getValue()}</p>,
  },
  {
    id: "view",
    header: () => <div className="text-center">View</div>,
    cell: ActionButton,
  },
  {
    id: "active",
    header: () => <div className="text-center">Active</div>,
    cell: ActiveSwitch,
  },
  {
    id: "idcard",
    header: () => <div className="text-center">Active</div>,
    cell: GetIdCardPage,
  },
  {
    id: "delete",
    header: () => <div className="text-center">Active</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger>
            <AiFillDelete className="h-5 w-5" color="crimson" />
          </DialogTrigger>
          <DialogContent className="max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Delete This User?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
              <DialogClose>
                <Button size="sm">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
];

function MembersTable({ tableData }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFiltering, setGlobalFiltering] = useState("");
  console.log("tabledata", tableData);

  const MembersTable = useReactTable({
    data: tableData,
    columns,
    // state: {
    //   columnFilters,
    //   globalFilter: globalFiltering,
    // },
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // onGlobalFilterChange: setGlobalFiltering,
  });

  return (
    <>
      {/* <div className="flex gap-8 px-4 pt-4">
        <MembersTableFilters
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <Input
          label="Search"
          value={globalFiltering}
          onChange={(e) => setGlobalFiltering(e.target.value)}
          icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        />
      </div> */}
      {/* <div className="flex w-full justify-end px-5 mt-4 gap-5">
        <div className="flex items-center gap-2">
          <div
            className={`max-w-[4px] max-h-[4px] rounded-full p-[3px] bg-green-500`}
          ></div>
          <Typography variant="small">Available</Typography>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`max-w-[4px] max-h-[4px] rounded-full p-[3px] bg-red-500`}
          ></div>
          <Typography variant="small">On Route</Typography>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`max-w-[4px] max-h-[4px] rounded-full p-[3px] bg-yellow-500`}
          ></div>
          <Typography variant="small">On Holiday</Typography>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`max-w-[4px] max-h-[4px] rounded-full p-[3px] bg-blue-500`}
          ></div>
          <Typography variant="small">On Sleep</Typography>
        </div>
      </div> */}
      <div className="rounded-md border">
        <Table className="w-full rounded-none min-w-max table-auto text-left">
          <TableHeader>
            {MembersTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {MembersTable.getRowModel().rows?.map((row, index) => {
              //   const isLast =
              //     index === MembersTable.getRowModel().rows.length - 1;
              //   const classes = isLast
              //     ? "p-4"
              //     : "p-4 border-b border-blue-gray-50";

              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      //   width={cell.column.getSize()}
                      //   className="p-2 text-sm text-center"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default MembersTable;
