import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Spinner } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

import { getToken } from "@/utils/jwt";

export default function DeleteTimeToBus(props) {
  const { time, isOpen, onClose, onOpenChange, onUpdate } = props;

  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    try {
      const token = await getToken();

      setSubmitting(true);

      await axios.delete(`/api/bus-times?id=${time?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Bus Schedule deleted successfully");
      onUpdate();
      onClose();
    } catch (error) {
      let message = "Error deleting bus";
      if (error?.response?.data?.error) {
        message = error.response.data.error;
      }
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Delete Bus Schedule</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                  <p className="font-extrabold text-sm">Bus</p>
                  <p className="text-sm">{time?.busName}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-extrabold text-sm">From</p>
                  <p className="text-sm">{time?.from}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-extrabold text-sm">To</p>
                  <p className="text-sm">{time?.to}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-extrabold text-sm">Time</p>
                  <p className="text-sm">
                    {time?.startTime} - {time?.endTime}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  Are you sure you want to delete this bus schedule?
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleDelete} disabled={submitting}>
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
