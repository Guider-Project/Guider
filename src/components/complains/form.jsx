"use client";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

export default function ComplainsForm() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      if (!name || !phoneNumber || !description) return toast.error("Please fill all the fields");

      const body = {
        name,
        phoneNumber,
        description,
      };

      await axios.post("/api/complains", body);

      toast.success("Complain added successfully");

      setName("");
      setPhoneNumber("");
      setDescription("");
    } catch (error) {
      let message = "Error adding complain";
      if (error?.response?.data?.error) {
        message = error.response.data.error;
      }
      toast.error(message);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col w-full justify-center items-center mt-24">
        <Card className="py-4 w-[70%] ">
          <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
            <h4 className="font-bold text-large">Make a Complaint</h4>
          </CardHeader>

          <CardBody className="overflow-visible py-5">
            <div className="flex w-full gap-5">
              <Input
                type="text"
                label="Name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                label="Phone number"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="w-full mt-5">
              <Textarea
                label="Description"
                labelPlacement="inside"
                placeholder="Enter your description"
                size="lg"
                className="w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="w-auto mt-5">
              <Button color="primary" onPress={handleSubmit}>
                Submit
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
