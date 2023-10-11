"use client";

import { Button } from "@nextui-org/react";

export default function Busses() {
  return (
    <>
      <div className="font-bold text-[30px] mb-5">Busses</div>
      <div className="flex flex-col">
        <Button className="w-[100px] bg-blue-700 text-white">+ Add new</Button>
      </div>
    </>
  );
}
