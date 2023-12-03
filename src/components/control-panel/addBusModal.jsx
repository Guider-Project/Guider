import axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Input, Spinner } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

import { getToken } from "@/utils/jwt";

export default function AddBusModal(props) {
  const { isOpen, onClose, onOpenChange, onUpdate } = props;

  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [seats, setSeats] = useState("");

  const handleSubmit = async () => {
    try {
      if (!name || !plateNumber || !phoneNumber || !seats)
        return toast.error("Please fill all the fields");

      if (!session?.data?._id) return toast.error("Please sign in to continue");

      const body = {
        name,
        plateNumber,
        phoneNumber,
        seats,
        userId: session?.data?._id,
      };

      const token = await getToken();

      setSubmitting(true);

      await axios.post("/api/busses", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Bus added successfully");
      onUpdate();
      onClose();

      setName("");
      setPlateNumber("");
      setPhoneNumber("");
      setSeats("");
    } catch (error) {
      let message = "Error adding bus";
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
            <ModalHeader className="flex flex-col gap-1">Add new bus</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                  <div className="">Bus Name</div>
                  <Input
                    key="outside-left"
                    type="text"
                    variant="bordered"
                    className="w-[400px]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="">Plate Number</div>
                  <Input
                    key="outside-left"
                    type="text"
                    variant="bordered"
                    className="w-[400px]"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="">Phone Number</div>
                  <Input
                    key="outside-left"
                    type="text"
                    variant="bordered"
                    className="w-[400px]"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="">Seat Count</div>
                  <Input
                    key="outside-left"
                    type="number"
                    variant="bordered"
                    className="w-[400px]"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleSubmit} disabled={submitting}>
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
