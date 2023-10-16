import { Card, CardBody } from "@nextui-org/react";

import TravelsTable from "@/components/homepage/travels/travelsTable";

export default function Travels() {
  return (
    <>
      <div className="flex flex-col h-[500px] px-24 w-full">
        <Card>
          <CardBody>
            <div className="flex flex-col w-full justify-center gap-5">
              <div className="text-[20px] font-bold w-full text-center">Upcoming Travels</div>
              <div>
                <TravelsTable />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
