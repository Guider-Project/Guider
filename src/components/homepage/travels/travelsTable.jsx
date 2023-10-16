"use client";
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";

const statusColorMap = {
  available: "success",
  full: "danger",
  "almost full": "warning",
};

export default function TravelsTable() {
  const columns = [
    { name: "FROM", uid: "from" },
    { name: "TO", uid: "to" },
    { name: "TIME", uid: "time" },
    { name: "PRICE", uid: "price" },
    { name: "PLATE", uid: "plate" },
    { name: "SEATS", uid: "seats" },
    { name: "STATUS", uid: "status" },
  ];

  const users = [
    {
      id: 1,
      from: "Kadawatha",
      to: "Makumbura",
      time: "10:00AM",
      price: "Rs. 300",
      plate: "ABC-1234",
      seats: "50/50",
      status: "full",
    },
    {
      id: 2,
      from: "Makumbura",
      to: "Embilipitiya",
      time: "10:15AM",
      price: "Rs. 1200",
      plate: "ABC-1234",
      seats: "45/50",
      status: "almost full",
    },
    {
      id: 3,
      from: "Makumbura",
      to: "Matara",
      time: "10:30AM",
      price: "Rs. 1070",
      plate: "ABC-1234",
      seats: "11/50",
      status: "available",
    },
    {
      id: 4,
      from: "Galle",
      to: "Makumbura",
      time: "10:45AM",
      price: "Rs. 1000",
      plate: "ABC-1234",
      seats: "28/50",
      status: "available",
    },
    {
      id: 5,
      from: "Kadawatha",
      to: "Makumbura",
      time: "11:00AM",
      price: "Rs. 300",
      plate: "ABC-1234",
      seats: "50/50",
      status: "full",
    },
  ];

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
