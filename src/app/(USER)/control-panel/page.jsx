"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Spinner, Button, useDisclosure } from "@nextui-org/react";

import NavBar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

import BusTable from "@/components/control-panel/tables/busTable";
import TimeTable from "@/components/control-panel/tables/timeTable";
import AddNewBusModal from "@/components/control-panel/addNewBusModal";
import AddTimeToBus from "@/components/control-panel/addTimeToBus";

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

  const {
    isOpen: isOpenAddNewBus,
    onOpen: onOpenAddNewBus,
    onClose: onCloseAddNewBus,
    onOpenChange: onOpenChangeAddNewBus,
  } = useDisclosure();

  const {
    isOpen: isOpenAddTimeToBus,
    onOpen: onOpenAddTimeToBus,
    onClose: onCloseAddTimeToBus,
    onOpenChange: onOpenChangeAddTimeToBus,
  } = useDisclosure();

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
              <h1 className="text-2xl font-semibold text-gray-700">Control Panel</h1>

              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex w-full gap-5">
                  {(user?.role === "admin" || user?.role === "bus") && (
                    <>
                      <Button className="" color="success" onPress={onOpenAddNewBus} auto>
                        Add new bus
                      </Button>

                      <Button className="" color="success" onPress={onOpenAddTimeToBus} auto>
                        Add new time
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex gap-4 w-full mt-10">
                  <div className="flex flex-col w-[50%]">
                    <div className="text-[25px] font-bold">Bus List</div>

                    <BusTable busses={busses} />
                  </div>

                  <div className="flex flex-col w-[50%]">
                    <div className="text-[25px] font-bold">Timetable</div>

                    <TimeTable times={busTimes} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <AddNewBusModal
        isOpen={isOpenAddNewBus}
        onClose={onCloseAddNewBus}
        onOpenChange={onOpenChangeAddNewBus}
        onUpdate={handleChangeUpdate}
      />

      <AddTimeToBus
        busses={busses}
        isOpen={isOpenAddTimeToBus}
        onClose={onCloseAddTimeToBus}
        onOpenChange={onOpenChangeAddTimeToBus}
        onUpdate={handleChangeUpdate}
      />

      <Footer />
    </>
  );
}
