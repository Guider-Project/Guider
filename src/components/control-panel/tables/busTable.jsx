import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export default function BusTable({ busses }) {
  return (
    <>
      <div className="p-5 mt-5 bg-gray-200 rounded-2xl">
        <Table aria-label="Example static collection table" className="min-h-[240px]">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>PLATE</TableColumn>
            <TableColumn>PHONE</TableColumn>
            <TableColumn>SEATS</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>

          <TableBody emptyContent={"No data to display."}>
            {busses.map((bus) => (
              <TableRow key={bus._id}>
                <TableCell>{bus.name}</TableCell>
                <TableCell>{bus.plateNumber}</TableCell>
                <TableCell>{bus.phoneNumber}</TableCell>
                <TableCell>{bus.seats}</TableCell>
                <TableCell>{bus.available ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <button className="px-2 py-1 text-white bg-green-500 rounded-md">Edit</button>
                  <button className="px-2 py-1 ml-2 text-white bg-red-500 rounded-md">
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
