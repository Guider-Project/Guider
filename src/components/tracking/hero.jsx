import { Card, CardBody } from "@nextui-org/react";

export default function Hero() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center bg-trackingBus h-[300px]">
        <div className="w-full flex flex-col justify-center items-center h-full bg-background/40">
          <Card className="border-none bg-background/10" isBlurred>
            <CardBody>
              <div className="font-bold text-[60px] px-10">Tracking</div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
