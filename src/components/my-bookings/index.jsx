"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";

import BookingCard from "@/components/my-bookings/card";

export default function MyBookingsComponents() {
  const { data: session } = useSession();

  const [busses, setBusses] = useState([]);
  const [times, setTimes] = useState([]);

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function getBusses() {
      try {
        const { data } = await axios.get("/api/busses");
        setBusses(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function getTimes() {
      try {
        const { data } = await axios.get("/api/bus-times");
        setTimes(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function getReservations() {
      try {
        let dataSet = [];

        const { data } = await axios.get("/api/reservations");
        for (const reservation of data) {
          if (reservation.userId === session?.data?._id) dataSet.push(reservation);
        }
        setReservations(dataSet);
      } catch (error) {
        console.log(error);
        toast.error("Error getting reservations");
      }
    }

    getBusses();
    getTimes();
    getReservations();
  }, [session]);

  useEffect(() => {
    console.log("reservations", reservations);
  }, [reservations]);

  return (
    <>
      <ToastContainer />

      <div className="grid grid-cols-2 gap-3 mt-5 mx-10 mb-5">
        {reservations.map((reservation) => {
          return <BookingCard busses={busses} times={times} data={reservation} />;
        })}
      </div>
    </>
  );
}
