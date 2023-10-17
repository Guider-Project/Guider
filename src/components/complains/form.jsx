import { Card, CardHeader, CardBody, Input, Textarea, Button } from "@nextui-org/react";

export default function ComplainsForm() {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center mt-24">
        <Card className="py-4 w-[70%] ">
          <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
            <h4 className="font-bold text-large">Make a Complaint</h4>
          </CardHeader>

          <CardBody className="overflow-visible py-5">
            <div className="flex w-full gap-5">
              <Input type="text" label="Name" placeholder="Enter your name" />
              <Input type="text" label="Phone number" placeholder="Enter your phone number" />
            </div>
            <div className="w-full mt-5">
              <Textarea
                label="Description"
                labelPlacement="inside"
                placeholder="Enter your description"
                size="lg"
                className="w-full"
              />
            </div>

            <div className="w-auto mt-5">
              <Button color="primary">Submit</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
