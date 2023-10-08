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
  const [to, setTo] = useState(items[1].label);
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    setDate(`${year}-${month}-${day}`);
  }, []);

  const handleSearch = () => {
    console.log(from, to, date);
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
                <div className="text-[80px] text-mainColour">Guider</div>
                <div className="text-[15px] text-black">Find your own way with your Guider</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[0px] w-full">
          <div className="flex flex-row justify-center">
            <div className="flex w-[50%] bg-mainColour bg-opacity-50 rounded-3xl backdrop-blur">
              <div className="flex flex-col items-center justify-center w-1/3 p-5 bg-mainColour text-white text-[20px] font-bold rounded-tl-3xl rounded-bl-3xl rounded-tr-[100px]">
                Search Bus Time Table
              </div>

              <div className="flex flex-col gap-3 py-10 px-10">
                <div className="grid grid-cols-6 items-center gap-4 justify-center">
                  <div className="flex flex-col justify-center text-white w-[70px]">FROM:</div>
                  <div className="col-span-4">
                    <Input type="text" value={from} disabled />
                  </div>
                  <div className="h-full">
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
                            onClick={() => setFrom(item.label)}
                          >
                            {item.label}
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  <div className="flex flex-col justify-center text-white w-[70px]">TO:</div>
                  <div className="col-span-4">
                    <Input type="text" value={to} disabled />
                  </div>
                  <div className="h-full">
                    <Dropdown>
                      <DropdownTrigger className="h-full">
                        <Button variant="" className="bg-white text-black">
                          Select
                        </Button>
                      </DropdownTrigger>

                      <DropdownMenu aria-label="Dynamic Actions" items={items}>
                        {(item) => (
                          <DropdownItem key={item.key} onClick={() => setTo(item.label)}>
                            {item.label}
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  <div className="flex flex-col justify-center text-white w-[57px]">DATE:</div>
                  <div className="col-span-5">
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </div>

                  <div></div>
                  <div className="col-span-5">
                    <Button className="w-full" color="primary" onClick={handleSearch}>
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
