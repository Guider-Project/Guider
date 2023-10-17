import { Card, CardBody } from "@nextui-org/react";

export default function Hero({ background, title }) {
  return (
    <>
      <div
        className={`w-full flex flex-col justify-center items-center ${background} bg-center h-[300px]`}
      >
        <div className="w-full flex flex-col justify-center items-center h-full bg-background/40">
          <Card className="border-none bg-background/10" isBlurred>
            <CardBody>
              <div className="font-bold text-[60px] px-10">{title}</div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
