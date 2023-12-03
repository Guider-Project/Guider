"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";

import QuickReservation from "@/components/homepage/travels/quickReservation";
import TravelsTable from "@/components/homepage/travels/travelsTable";
import MakeReservationModal from "@/components/reservations/modals/makeReservationModal";

export default function Travels() {
  const { data: session, status } = useSession();

  const [schedule, setSchedule] = useState([]);
  const [nextBusSchedule, setNextBusSchedule] = useState([]);

  const [update, setUpdate] = useState(false);
  const toggleUpdate = () => setUpdate(!update);

  useEffect(() => {
    async function getBusses() {
      try {
        const { data } = await axios.get("/api/bus-times");
        setSchedule(data);
      } catch (error) {
        console.log(error);
        toast.error("Error getting busses!");
      }
    }

    getBusses();
  }, []);

  useEffect(() => {
    async function getBusses() {
      try {
        const { data } = await axios.get("/api/bus-times");
        console.log(data);
        setSchedule(data);
      } catch (error) {
        console.log(error);
        toast.error("Error getting busses!");
      }
    }

    getBusses();
  }, []);

  useEffect(() => {
    function getNextFiveSchedules(data) {
      // Get the current date and time
      const now = new Date();

      // Sort the data based on startTime
      data.sort((a, b) => a.startTime.localeCompare(b.startTime));

      let nextSchedules = [];
      if (data.length === 1) {
        // If there's only one bus, schedule it for the next 5 days
        for (let i = 0; i < 5; i++) {
          let scheduleDate = new Date(now);
          scheduleDate.setDate(scheduleDate.getDate() + i); // Increment the date
          let formattedDate = scheduleDate.toISOString().split("T")[0];

          let [hours, minutes] = data[0].startTime.split(":");
          scheduleDate.setHours(hours, minutes, 0, 0);

          nextSchedules.push({
            ...data[0],
            startTime: scheduleDate.toTimeString().split(" ")[0],
            date: formattedDate,
          });
        }
      } else {
        // If there are multiple buses, get the next 5 schedules
        for (let i = 0, j = 0; i < data.length && j < 5; i++) {
          let scheduleDate = new Date(now);
          let [hours, minutes] = data[i].startTime.split(":");
          scheduleDate.setHours(hours, minutes, 0, 0);

          if (scheduleDate < now) {
            // If the schedule time has passed for today, set it to the next day
            scheduleDate.setDate(scheduleDate.getDate() + 1);
          }

          let formattedDate = scheduleDate.toISOString().split("T")[0];

          nextSchedules.push({
            ...data[i],
            startTime: scheduleDate.toTimeString().split(" ")[0],
            date: formattedDate,
          });
          j++;
        }
      }

      return nextSchedules;
    }

    const nextSchedules = getNextFiveSchedules(schedule);
    setNextBusSchedule(nextSchedules);
  }, [schedule]);

  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const {
    isOpen: isOpenMakeReservation,
    onOpen: onOpenMakeReservation,
    onClose: onCloseMakeReservation,
    onOpenChange: onOpenChangeMakeReservation,
  } = useDisclosure();

  const handleSelectSchedule = (schedule) => {
    if (session?.data?.role !== "client")
      return toast.error(
        "Reservations are only for users. Please make an default account to continue",
      );
    setSelectedSchedule(schedule);
    onOpenMakeReservation();
  };

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col h-[850px] items-center px-24 w-full gap-16">
        <div className="w-[40%]">
          <QuickReservation />
        </div>

        <div className="w-full">
          <Card>
            <CardBody>
              <div className="flex flex-col w-full justify-center gap-5">
                <div className="text-[20px] font-bold w-full text-center">Upcoming Travels</div>
                <div>
                  <TravelsTable
                    schedule={nextBusSchedule}
                    onSelectSchedule={handleSelectSchedule}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <MakeReservationModal
        selectedSchedule={selectedSchedule}
        isOpen={isOpenMakeReservation}
        onOpenChange={onOpenChangeMakeReservation}
        onClose={onCloseMakeReservation}
        schedule={nextBusSchedule}
        onUpdate={toggleUpdate}
      />
    </>
  );
}
