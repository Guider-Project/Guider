"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";

export default function Hero() {
  const [busses, setBusses] = useState([]);
  const [journeys, setJourneys] = useState([]);
  const [reservations, setReservations] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getBusses() {
      try {
        const { data } = await axios.get("/api/busses");
        setBusses(data);
      } catch (error) {
        console.log(error);
        toast.error("Error getting busses!");
      }
    }

    async function getReservations() {
      try {
        let total = 0;

        const { data } = await axios.get("/api/reservations");
        let _reservations = [...data];

        for (const reservation of _reservations) total += reservation.seats;

        setReservations(total);
        setTransactions(data);
      } catch (error) {
        console.log(error);
        toast.error("Error getting reservations!");
      }
    }

    getBusses();
    getReservations();
  }, []);

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col h-[630px] py-10 px-24">
        <div className="flex w-full">
          <div className="w-3/5 flex flex-col justify-center">
            <div className="font-bold text-[80px]">Guider</div>
            <div className="text-[20px]">Highway bus management system</div>
          </div>

          <div className="w-2/5 flex flex-col justify-center">
            <Card className="py-4 bg-background/40 border-none" isBlurred>
              <CardHeader className="pb-0 pt-2 px-8 flex-col items-start">
                <p className="uppercase font-bold text-large">Summery</p>
              </CardHeader>

              <CardBody className="py-5 px-8">
                <div className="grid grid-cols-4 gap-4 font-bold">
                  <div className="flex flex-col items-center bg-primary text-white rounded-2xl py-2 text-[25px]">
                    {busses.length}
                    <br /> <span className="text-xs font-normal">Total buses</span>
                  </div>

                  <div className="flex flex-col items-center bg-primary text-white rounded-2xl py-2 text-[25px]">
                    {journeys.length} <br /> <span className="text-xs font-normal">Journeys</span>
                  </div>

                  <div className="flex flex-col items-center bg-primary text-white rounded-2xl py-2 text-[25px]">
                    {reservations} <br /> <span className="text-xs font-normal">Reservations</span>
                  </div>

                  <div className="flex flex-col items-center bg-primary text-white rounded-2xl py-2 text-[25px]">
                    {transactions.length} <br />{" "}
                    <span className="text-xs font-normal">Transactions</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="flex flex-col w-full mt-24 text-center text-[50px]">
          <div className="font-bold">We are the leading bus service provider in Sri Lanka</div>
          <div className="text-[20px] mt-5">
            We provide the best service for our customers. We have a large collection of buses
            around the country with timetable. Want to book a bus? Just click the button below.
          </div>
          <div className="flex w-full justify-center mt-5 gap-5">
            <Button color="primary" size="lg">
              Reserve a seat {"->"}
            </Button>

            <Button className="text-primary" color="primary" size="lg" variant="bordered">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
