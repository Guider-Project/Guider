import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Input, Spinner, Textarea, useDisclosure } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

import QRModal from "@/components/reservations/modals/QRCode";

import { getToken } from "@/utils/jwt";

export default function MakeReservationModal(props) {
  const { selectedSchedule, isOpen, onClose, onOpenChange, onUpdate } = props;

  const { data: session } = useSession();

  useEffect(() => {
    console.log(selectedSchedule);
  }, [selectedSchedule]);

  const [submitting, setSubmitting] = useState(false);

  const [seatCount, setSeatCount] = useState("1");
  const [remarks, setRemarks] = useState("");

  const {
    isOpen: isOpenQRCode,
    onOpen: onOpenQRCode,
    onClose: onCloseQRCode,
    onOpenChange: onOpenChangeQRCode,
  } = useDisclosure();

  const handleSubmit = async () => {
    try {
      if (!selectedSchedule) return toast.error("Please select a schedule");

      const body = {
        busTime: selectedSchedule._id,
        seats: seatCount,
        remarks,
        userId: session?.data?._id,
      };

      const token = await getToken();

      setSubmitting(true);

      await axios.post("/api/reservations", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Reservation added successfully");
      onUpdate();
      onClose();

      onOpenQRCode();

      setSeatCount("1");
      setRemarks("");
    } catch (error) {
      console.log(error);
      let message = "Error adding reservation";
      if (error?.response?.data?.error) {
        message = error.response.data.error;
      }
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangeSeatCount = (e) => {
    const maxSeats = parseInt(selectedSchedule?.maxSeats);
    const bookedSeats = parseInt(selectedSchedule?.seats);
    const availableSeats = maxSeats - bookedSeats;

    const _seatCount = e.target.value;

    if (_seatCount < 1) {
      return toast.error("Seat count cannot be less than 1");
    }

    if (_seatCount > availableSeats) {
      return toast.error("Not enough seats");
    }
    setSeatCount(_seatCount);
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!selectedSchedule) return;
    const _total = parseInt(seatCount) * parseInt(selectedSchedule?.price);
    setTotal(_total);
  }, [selectedSchedule, seatCount]);

  return (
    <>
      <ToastContainer />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Add new reservation</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                  <div className="">
                    <span className="font-bold">Bus Name:</span> {selectedSchedule?.busName}
                  </div>

                  <div className="">
                    <span className="font-bold">Plate Number:</span> {selectedSchedule?.plateNumber}
                  </div>

                  <div className="">
                    <span className="font-bold">Trip:</span> {selectedSchedule?.from} -{" "}
                    {selectedSchedule?.to}
                  </div>

                  <div className="">
                    <span className="font-bold">Time:</span> {selectedSchedule?.startTime}
                  </div>

                  <div className="">
                    <span className="font-bold">Date:</span> {selectedSchedule?.date}
                  </div>

                  <div className="">
                    <span className="font-bold">Available Seats:</span>{" "}
                    {selectedSchedule?.maxSeats - selectedSchedule?.seats}
                  </div>

                  <div className="">
                    <span className="font-bold">Total:</span> Rs.{total}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="">Seats</div>
                  <Input
                    key="outside-left"
                    type="number"
                    variant="bordered"
                    className="w-[400px]"
                    value={seatCount}
                    onChange={handleChangeSeatCount}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="">Remarks</div>
                  <Textarea
                    key="outside-left"
                    type="number"
                    variant="bordered"
                    className="w-[400px]"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
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

      <QRModal
        word={JSON.stringify({
          busName: selectedSchedule?.busName,
          plateNumber: selectedSchedule?.plateNumber,
          from: selectedSchedule?.from,
          to: selectedSchedule?.to,
          startTime: selectedSchedule?.startTime,
          date: selectedSchedule?.date,
          seats: seatCount,
          remarks,
          total,
        })}
        isOpen={isOpenQRCode}
        onClose={onCloseQRCode}
        onOpenChange={onOpenChangeQRCode}
      />
    </>
  );
}
