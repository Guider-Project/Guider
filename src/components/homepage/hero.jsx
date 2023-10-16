import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col h-[660px] py-10 px-24">
        <div className="flex w-full">
          <div className="w-3/5 flex flex-col justify-center">
            <div className="font-bold text-[80px]">Guider</div>
            <div className="text-[20px]">Highway bus management system</div>
          </div>

          <div className="w-2/5 flex flex-col justify-center">
            <Card className="py-4 bg-background/40 border-none" isBlurred>
              <CardHeader className="pb-0 pt-2 px-8 flex-col items-start">
                <p className="uppercase font-bold text-large">Summery</p>
              </CardHeader>

              <CardBody className="py-5 px-8">
                <div className="grid grid-cols-4 gap-4 font-bold">
                  <div className="flex flex-col items-center bg-primary text-white rounded-2xl py-2 text-[25px]">
                    10+ <br /> <span className="text-xs font-normal">Total buses</span>
                  </div>

                  <div className="flex flex-col items-center bg-primary text-white rounded-2xl py-2 text-[25px]">
                    250+ <br /> <span className="text-xs font-normal">Journeys</span>
                  </div>

                  <div className="flex flex-col items-center bg-primary text-white rounded-2xl py-2 text-[25px]">
                    5k+ <br /> <span className="text-xs font-normal">Reservations</span>
                  </div>

                  <div className="flex flex-col items-center bg-primary text-white rounded-2xl py-2 text-[25px]">
                    Rs.50k+ <br /> <span className="text-xs font-normal">Transactions</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="flex flex-col w-full mt-24 text-center text-[50px]">
          <div className="font-bold">We are the leading bus service provider in Sri Lanka</div>
          <div className="text-[20px] mt-5">
            We provide the best service for our customers. We have a large collection of buses
            around the country with timetable. Want to book a bus? Just click the button below.
          </div>
          <div className="flex w-full justify-center mt-5 gap-5">
            <Button color="primary" size="lg">
              Reserve a seat {"->"}
            </Button>

            <Button className="text-primary" color="primary" size="lg" variant="bordered">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
