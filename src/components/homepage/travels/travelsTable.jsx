"use client";

import React, { useEffect } from "react";
import { Chip } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const seatsColorMap = {
  available: "success",
  full: "danger",
  "almost full": "warning",
};

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function TravelsTable(props) {
  const { schedule, onSelectSchedule } = props;

  const columns = [
    { name: "FROM", uid: "from" },
    { name: "TO", uid: "to" },
    { name: "DATE", uid: "date" },
    { name: "TIME", uid: "startTime" },
    { name: "PRICE", uid: "price" },
    { name: "BUS", uid: "busName" },
    { name: "PLATE", uid: "plateNumber" },
    { name: "SEATS", uid: "seats" },
    { name: "STATUS", uid: "available" },
    { name: "ACTIONS", uid: "actions" },
  ];

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  const renderCell = React.useCallback(
    (bus, columnKey) => {
      const cellValue = bus[columnKey];

      switch (columnKey) {
        case "seats":
          const seatState =
            bus.seats > bus.maxSeats
              ? "full"
              : bus.seats > bus.maxSeats - 5
              ? "almost full"
              : "available";
          return (
            <Chip className="capitalize" color={seatsColorMap[seatState]} size="sm" variant="flat">
              {seatState}
            </Chip>
          );
        case "available":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[bus.available]}
              size="sm"
              variant="flat"
            >
              {bus.available ? "Available" : "Not available"}
            </Chip>
          );
        case "actions":
          return (
            <div className="flex flex-row gap-2">
              <button
                className="px-2 py-1 text-white bg-primary rounded-md"
                onClick={() => onSelectSchedule(bus)}
                disabled={!bus.available || bus.seats >= bus.maxSeats}
              >
                Make a reservation
              </button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [schedule],
  );

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={schedule}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
