import { useState } from "react";
import QRCode from "qrcode.react";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import React from "react";

export default function QRModal(props) {
  const { word, isOpen, onClose, onOpenChange, onUpdate } = props;

  const [qrElement, setQrElement] = useState();

  const downloadQR = () => {
    if (!qrElement) {
      return;
    }

    const canvas = qrElement.querySelector("canvas");
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-auto">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Reservation QR</ModalHeader>
          <ModalBody>
            <div className="flex flex-col justify-center items-center">
              <div className="my-12" ref={setQrElement}>
                <QRCode value={word} />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={downloadQR}>
              Download
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
