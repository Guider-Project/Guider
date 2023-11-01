import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export default function TimeTable({ times }) {
  return (
    <>
      <div className="p-5 mt-5 bg-gray-200 rounded-2xl">
        <Table aria-label="Example static collection table" className="min-h-[240px]">
          <TableHeader>
            <TableColumn>BUS</TableColumn>
            <TableColumn>FROM</TableColumn>
            <TableColumn>TO</TableColumn>
            <TableColumn>START</TableColumn>
            <TableColumn>END</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>

          <TableBody emptyContent={"No data to display."}>
            {times.map((time) => (
              <TableRow key={time._id}>
                <TableCell>{time.busName}</TableCell>
                <TableCell>{time.from}</TableCell>
                <TableCell>{time.to}</TableCell>
                <TableCell>{time.startTime}</TableCell>
                <TableCell>{time.endTime}</TableCell>
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
