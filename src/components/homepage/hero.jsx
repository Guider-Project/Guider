import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function Hero() {
  return (
    <>
      <div className="flex h-[300px] py-10 px-24 bg-bus">
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
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col items-center bg-black text-white rounded-2xl py-2 text-[30px]">
                  10+ <br /> <span className="text-xs">Total buses</span>
                </div>

                <div className="flex flex-col items-center bg-black text-white rounded-2xl py-2 text-[30px]">
                  250+ <br /> <span className="text-xs">Journeys</span>
                </div>

                <div className="flex flex-col items-center bg-black text-white rounded-2xl py-2 text-[30px]">
                  5k+ <br /> <span className="text-xs">Reservations</span>
                </div>

                <div className="flex flex-col items-center bg-black text-white rounded-2xl py-2 text-[30px]">
                  Rs.50k+ <br /> <span className="text-xs">Transactions</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
