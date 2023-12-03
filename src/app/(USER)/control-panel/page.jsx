"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Spinner, Button, useDisclosure } from "@nextui-org/react";

import NavBar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

import BusTable from "@/components/control-panel/tables/busTable";
import TimeTable from "@/components/control-panel/tables/timeTable";

import AddBusModal from "@/components/control-panel/addBusModal";
import EditBusModal from "@/components/control-panel/editBusModal";
import DeleteBusModal from "@/components/control-panel/deleteBusModal";

import AddTimeModal from "@/components/control-panel/addTimeModal";
import EditTimeToBus from "@/components/control-panel/editTimeModal";
import DeleteTimeToBus from "@/components/control-panel/deleteTimeModal";

export default function Settings() {
  const { data: session, status } = useSession();

  const [update, setUpdate] = useState(false);

  const handleChangeUpdate = () => setUpdate(!update);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated") {
      setUser(session?.data);
      setAuthenticated(true);
      setLoading(false);
    }
    if (status === "unauthenticated") {
      setAuthenticated(false);
      setLoading(false);
    }
  }, [session, status]);

  const [busses, setBusses] = useState([]);
  const [times, setTimes] = useState([]);
  const [busTimes, setBusTimes] = useState([]);

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

    getBusses();
    getTimes();
  }, []);

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

    getBusses();
    getTimes();
  }, [update]);

  useEffect(() => {
    for (const time of times) {
      const _bus = busses.find((_bus) => _bus._id === time.bus);
      if (!_bus) continue;
      time.busName = _bus.name + " - " + _bus.plateNumber;
    }

    setBusTimes(times);
  }, [busses, times]);

  useEffect(() => {
    console.log("session", session);
    console.log("busses", busses);
    console.log("busTimes", busTimes);
  }, [session, busses, busTimes]);

  // Bus Modals
  const {
    isOpen: isOpenAddNewBus,
    onOpen: onOpenAddNewBus,
    onClose: onCloseAddNewBus,
    onOpenChange: onOpenChangeAddNewBus,
  } = useDisclosure();

  const {
    isOpen: isOpenEditBus,
    onOpen: onOpenEditBus,
    onClose: onCloseEditBus,
    onOpenChange: onOpenChangeEditBus,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteBus,
    onOpen: onOpenDeleteBus,
    onClose: onCloseDeleteBus,
    onOpenChange: onOpenChangeDeleteBus,
  } = useDisclosure();

  // Time Modals
  const {
    isOpen: isOpenAddTimeToBus,
    onOpen: onOpenAddTimeToBus,
    onClose: onCloseAddTimeToBus,
    onOpenChange: onOpenChangeAddTimeToBus,
  } = useDisclosure();

  const {
    isOpen: isOpenEditTimeToBus,
    onOpen: onOpenEditTimeToBus,
    onClose: onCloseEditTimeToBus,
    onOpenChange: onOpenChangeEditTimeToBus,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteTimeToBus,
    onOpen: onOpenDeleteTimeToBus,
    onClose: onCloseDeleteTimeToBus,
    onOpenChange: onOpenChangeDeleteTimeToBus,
  } = useDisclosure();

  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleEditBus = (bus) => {
    setSelectedBus(bus);
    onOpenEditBus();
  };

  const handleDeleteBus = (bus) => {
    setSelectedBus(bus);
    onOpenDeleteBus();
  };

  const handleEditTime = (time) => {
    setSelectedTime(time);
    onOpenEditTimeToBus();
  };

  const handleDeleteTime = (time) => {
    setSelectedTime(time);
    onOpenDeleteTimeToBus();
  };

  return (
    <>
      <NavBar activeTab="settings" />

      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <>
          {!authenticated ? (
            <div className="flex justify-center items-center h-[calc(100vh-470px)] w-screen">
              <h1 className="text-2xl font-semibold text-gray-700">Please sign in to continue.</h1>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full py-10 px-24 gap-8">
              <h1 className="text-[30px] font-semibold text-white bg-primary px-10 py-3 rounded-2xl">
                Control Panel
              </h1>

              <div className="flex flex-col items-center justify-center w-full mt-6">
                <div className="flex gap-4 w-full">
                  <div className="flex flex-col w-[50%]">
                    <div className="flex gap-10">
                      <div className="text-[25px] font-bold">Bus List</div>
                      {(user?.role === "admin" || user?.role === "bus") && (
                        <Button className="" color="success" onPress={onOpenAddNewBus} auto>
                          Add new bus
                        </Button>
                      )}
                    </div>

                    <BusTable busses={busses} onEdit={handleEditBus} onDelete={handleDeleteBus} />
                  </div>

                  <div className="flex flex-col w-[50%]">
                    <div className="flex gap-10">
                      <div className="text-[25px] font-bold">Timetable</div>

                      {(user?.role === "admin" || user?.role === "bus") && (
                        <Button className="" color="success" onPress={onOpenAddTimeToBus} auto>
                          Add new time
                        </Button>
                      )}
                    </div>

                    <TimeTable
                      times={busTimes}
                      onEdit={handleEditTime}
                      onDelete={handleDeleteTime}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <AddBusModal
        isOpen={isOpenAddNewBus}
        onClose={onCloseAddNewBus}
        onOpenChange={onOpenChangeAddNewBus}
        onUpdate={handleChangeUpdate}
      />

      <EditBusModal
        bus={selectedBus}
        isOpen={isOpenEditBus}
        onClose={onCloseEditBus}
        onOpenChange={onOpenChangeEditBus}
        onUpdate={handleChangeUpdate}
      />

      <DeleteBusModal
        bus={selectedBus}
        isOpen={isOpenDeleteBus}
        onClose={onCloseDeleteBus}
        onOpenChange={onOpenChangeDeleteBus}
        onUpdate={handleChangeUpdate}
      />

      <AddTimeModal
        busses={busses}
        isOpen={isOpenAddTimeToBus}
        onClose={onCloseAddTimeToBus}
        onOpenChange={onOpenChangeAddTimeToBus}
        onUpdate={handleChangeUpdate}
      />

      <EditTimeToBus
        busses={busses}
        time={selectedTime}
        isOpen={isOpenEditTimeToBus}
        onClose={onCloseEditTimeToBus}
        onOpenChange={onOpenChangeEditTimeToBus}
        onUpdate={handleChangeUpdate}
      />

      <DeleteTimeToBus
        time={selectedTime}
        isOpen={isOpenDeleteTimeToBus}
        onClose={onCloseDeleteTimeToBus}
        onOpenChange={onOpenChangeDeleteTimeToBus}
        onUpdate={handleChangeUpdate}
      />

      <Footer />
    </>
  );
}
