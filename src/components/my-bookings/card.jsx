import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import QRCode from "qrcode.react";

export default function BookingCard({ busses, times, data }) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    let _data = { ...data };

    const _busTime = times.find((time) => time._id === data.busTime);
    if (_busTime) {
      _data.from = _busTime.from;
      _data.to = _busTime.to;
      _data.startTime = _busTime.startTime;
      _data.endTime = _busTime.endTime;
      _data.busName = _busTime.busName;
      _data.plateNumber = _busTime.plateNumber;
    }

    setInfo(_data);
  }, [data]);

  return (
    <Card className="border-2 border-primary">
      <CardBody>
        <div className="flex h-[200px] px-10 w-full">
          <div className="flex flex-col justify-center w-[70%]">
            <h1 className="text-xl font-bold">Ticket: {info._id}</h1>
            <h1 className="text-xl font-bold">Bus Name: {info.busName}</h1>
            <h1 className="text-xl font-bold">Plate Number: {info.plateNumber}</h1>
            <h1 className="text-xl font-bold">From: {info.from}</h1>
            <h1 className="text-xl font-bold">To: {info.to}</h1>
            <h1 className="text-xl font-bold">Time: {info.startTime}</h1>
          </div>

          <div className="flex flex-col justify-center content-center items-center w-[30%]">
            <QRCode value={"word"} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
