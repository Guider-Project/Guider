import axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Input, Spinner } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

import { getToken } from "@/utils/jwt";

const SUPPORTED_LOCATIONS = [
  "Makumbura",
  "Matara",
  "Galle",
  "Embilipitiya",
  "Kaduwela",
  "Kadawatha",
].sort();

export default function AddTimeModal(props) {
  const { busses, isOpen, onClose, onOpenChange, onUpdate } = props;
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);

  const [bus, setBus] = useState("Select Bus");
  const [busName, setBusName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [price, setPrice] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleChangeBus = (e) => {
    const _id = e.currentKey;
    const _bus = busses.find((_bus) => _bus._id === _id);

    const _busName = _bus.name + " - " + _bus.plateNumber;
    setBusName(_busName);
    setBus(_id);
  };

  const handleSubmit = async () => {
    try {
      if (!bus || !from || !to || !startTime || !endTime) {
        return toast.error("Please fill all the fields");
      }

      if (!session?.data?._id) return toast.error("Please sign in to continue");

      if (from === to) return toast.error("From and To cannot be the same");

      if (price < 0) return toast.error("Price cannot be negative");

      const fixedStartTime = parseInt(startTime.split(":").join(""));
      const fixedEndTime = parseInt(endTime.split(":").join(""));

      if (fixedStartTime >= fixedEndTime)
        return toast.error("Start time should be less than end time");

      const body = {
        bus,
        from,
        to,
        price,
        startTime,
        endTime,
        userId: session?.data?._id,
      };

      setSubmitting(true);

      const token = await getToken();

      await axios.post("/api/bus-times", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Time added successfully");
      onUpdate();
      onClose();

      setBus("Select Bus");
      setBusName("");
      setFrom("");
      setTo("");
      setPrice(0);
      setStartTime("");
      setEndTime("");
    } catch (error) {
      let message = "Error adding time";
      if (error?.response?.data?.error) {
        message = error.response.data.error;
      }
      toast.error(message);
    }

    setSubmitting(false);
  };

  return (
    <>
      <ToastContainer />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Add new time</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                  <div className="">Select Bus</div>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" className="capitalize">
                        {busName || "Select Bus"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Single selection example"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      onSelectionChange={handleChangeBus}
                    >
                      {busses.map((bus) => (
                        <DropdownItem key={bus._id} value={bus.name}>
                          {bus.name + " - " + bus.plateNumber}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="">From</div>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" className="capitalize">
                        {from || "Select From"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Single selection example"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      onSelectionChange={(e) => setFrom(e.currentKey)}
                    >
                      {SUPPORTED_LOCATIONS.map((location) => (
                        <DropdownItem key={location} value={location}>
                          {location}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="">To</div>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" className="capitalize">
                        {to || "Select Destination"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Single selection example"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      onSelectionChange={(e) => setTo(e.currentKey)}
                    >
                      {SUPPORTED_LOCATIONS.map((location) => (
                        <DropdownItem key={location} value={location}>
                          {location}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="">Price</div>
                  <Input
                    key="outside-left"
                    type="number"
                    variant="bordered"
                    className="w-[400px]"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    startContent={"Rs."}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="">Start Time</div>
                  <Input
                    key="outside-left"
                    type="time"
                    variant="bordered"
                    className="w-[400px]"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="">End Time</div>
                  <Input
                    key="outside-left"
                    type="time"
                    variant="bordered"
                    className="w-[400px]"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" disabled={submitting} onPress={handleSubmit}>
                {submitting && <Spinner size="sm" color="white" />}
                Save
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
