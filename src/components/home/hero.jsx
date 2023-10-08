"use client";

import { useState, useEffect } from "react";
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function Hero() {
  const items = [
    {
      key: "kadawatha",
      label: "Kadawatha",
    },
    {
      key: "embilipitiya",
      label: "Embilipitiya",
    },
    {
      key: "colombo",
      label: "Colombo",
    },
    {
      key: "galle",
      label: "Galle",
    },
  ];

  const [from, setFrom] = useState(items[0].label);
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const onSelectFrom = (item) => {
    setFrom(item.label);
  };

  return (
    <>
      <div className="relative w-[100vw] h-[55vh]">
        <div className="relative w-full h-[40vh]">
          <div
            className="relative bg-center bg-cover h-full w-full"
            style={{ backgroundImage: `url('/images/home/hero.jpg')` }}
          >
            <div className="absolute inset-0 flex items-center mx-[5vw]">
              <div className="flex flex-col">
                <div className="text-3xl font-bold text-black">Welcome to</div>
                <div className="text-[80px] text-primary">Guider</div>
                <div className="text-[15px] text-black">Find your own way with your Guider</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[0px] w-full">
          <div className="flex flex-row justify-center">
            <div className="flex w-[50%] h-[300px] bg-primary bg-opacity-50 rounded-3xl backdrop-blur">
              <div className="flex flex-col items-center justify-center w-1/3 p-5 bg-primary text-white text-[20px] font-bold rounded-tl-3xl rounded-bl-3xl rounded-tr-[100px]">
                Online Seat Reservation
              </div>

              <div className="flex flex-col items-center gap-3 justify-center w-2/3 px-10">
                <div className="flex gap-3 w-full">
                  <div className="flex flex-col justify-center text-white w-[70px]">FROM:</div>

                  <Input type="text" label={from} disabled />
                  <Dropdown>
                    <DropdownTrigger className="h-full">
                      <Button variant="" className="bg-white text-black">
                        Select
                      </Button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Dynamic Actions" items={items}>
                      {(item) => (
                        <DropdownItem
                          key={item.key}
                          color={item.key === "delete" ? "danger" : "default"}
                          className={item.key === "delete" ? "text-danger" : ""}
                          onClick={() => onSelectFrom(item)}
                        >
                          {item.label}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div className="flex gap-3 w-full">
                  <div className="flex flex-col justify-center text-white w-[70px]">TO:</div>

                  <Input type="text" label={from} disabled />

                  <Dropdown>
                    <DropdownTrigger className="h-full">
                      <Button variant="" className="bg-white text-black">
                        Select
                      </Button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Dynamic Actions" items={items}>
                      {(item) => (
                        <DropdownItem
                          key={item.key}
                          color={item.key === "delete" ? "danger" : "default"}
                          className={item.key === "delete" ? "text-danger" : ""}
                          onClick={() => onSelectFrom(item)}
                        >
                          {item.label}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div className="flex gap-3 w-full">
                  <div className="flex flex-col justify-center text-white w-[57px]">DATE:</div>
                  <Input
                    type="date"
                    label={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
