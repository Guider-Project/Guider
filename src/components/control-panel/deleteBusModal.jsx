import axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Input, Spinner } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

import { getToken } from "@/utils/jwt";

export default function DeleteBusModal(props) {
  const { bus, isOpen, onClose, onOpenChange, onUpdate } = props;

  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    try {
      const token = await getToken();

      setSubmitting(true);

      await axios.delete(`/api/busses?id=${bus?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Bus deleted successfully");
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
            <ModalHeader className="flex flex-col gap-1">Delete Bus</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                  <p className="font-extrabold text-sm">Name</p>
                  <p className="text-sm">{bus?.name}</p>
                </div>

                <span className="text-sm">This will delete the bus schedules as well.</span>

                <span className="text-sm">
                  Are you sure you want to delete this bus?{" "}
                  <span className="text-sm gap-2 text-warning">This action cannot be undone!</span>
                </span>
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
