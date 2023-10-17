"use client";

import { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Card, CardBody, Input } from "@nextui-org/react";

export default function QuickReservation() {
  const locations = ["Makumbura", "Matara", "Kadawatha", "Embilipitiya"];

  const [from, setFrom] = useState(locations[0]);
  const [to, setTo] = useState(locations[1]);

  const handleFromChange = (e) => {
    setFrom(e);
  };

  const handleToChange = (e) => {
    setTo(e);
  };

  return (
    <>
      <Card>
        <CardBody>
          <div className="w-full flex flex-col justify-center items-center px-5 py-3 pb-5">
            <div className="font-bold text-[20px]">Make a quick reservation</div>

            <div className="flex flex-col w-full">
              <div className="grid grid-cols-2 gap-5 mt-5 items-center">
                <div className="flex flex-col gap-2">
                  <div className="text-[14px]">From</div>
                  <div className="">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered" className="capitalize w-full">
                          {from}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={from}
                        onSelectionChange={handleFromChange}
                      >
                        {locations.map((location) => (
                          <DropdownItem key={location} className="text-black">
                            {location}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[14px]">To</div>
                  <div className="">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered" className="capitalize w-full">
                          {to}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={to}
                        onSelectionChange={handleToChange}
                      >
                        {locations.map((location) => (
                          <DropdownItem key={location} className="text-black">
                            {location}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-3 items-center">
                <div className="flex flex-col gap-2">
                  <div className="text-[14px]">Date</div>
                  <div className="">
                    <Input type="date" variant="bordered" className="" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[14px]">Time</div>
                  <div className="">
                    <Input type="time" variant="bordered" className="" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-5 items-center">
                <div className="flex flex-col gap-2">
                  <div className="text-[14px]">Tickets</div>
                  <div className="">
                    <Input type="number" variant="bordered" className="" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[14px] text-white">.</div>
                  <Button variant="bordered" className="w-full bg-primary text-white">
                    Reserve {"->"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
