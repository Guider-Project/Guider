"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

export default function Timetable() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const users = [
    {
      name: "John Doe",
      role: "Admin",
      status: "Active",
    },
    {
      name: "John Doe",
      role: "Admin",
      status: "Active",
    },
  ];

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  return (
    <>
      <div className="font-bold text-[30px] mb-5">Timetable</div>
      <div className="flex flex-col">
        <Button className="w-[100px] bg-blue-700 text-white">+ Add new</Button>

        <Table
          className="mt-5"
          aria-label="Example table with client side pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn key="name">NAME</TableColumn>
            <TableColumn key="role">ROLE</TableColumn>
            <TableColumn key="status">STATUS</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.name}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
