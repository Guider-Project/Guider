import { dbConnect } from "@/lib/dbConnect";
import { BusTime } from "@/models";

export async function GET(request) {
  await dbConnect();

  const busTimes = await BusTime.find({});
  return Response.json(busTimes);
}

export async function POST(request) {
  await dbConnect();

  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { bus, from, to, price, startTime, endTime } = res;

  if (!bus || !from || !to || !price || !startTime || !endTime)
    return Response.json({ error: "Missing data" }, { status: 400 });

  const busTimeExists = await BusTime.findOne({
    bus,
    from,
    to,
    price,
    startTime,
    endTime,
  });

  if (busTimeExists) return Response.json({ error: "Bus time already exists" }, { status: 400 });

  const existingBusTime = await BusTime.find({ bus });

  const fixedStartTime = parseInt(startTime.split(":").join(""));
  const fixedEndTime = parseInt(endTime.split(":").join(""));

  for (let i = 0; i < existingBusTime.length; i++) {
    const { startTime, endTime } = existingBusTime[i];
    const fixedExistingStartTime = parseInt(startTime.split(":").join(""));
    const fixedExistingEndTime = parseInt(endTime.split(":").join(""));

    if (
      (fixedStartTime >= fixedExistingStartTime && fixedStartTime <= fixedExistingEndTime) ||
      (fixedEndTime >= fixedExistingStartTime && fixedEndTime <= fixedExistingEndTime)
    ) {
      return Response.json({ error: "Bus already booked for this time" }, { status: 400 });
    }
  }

  const busTime = await BusTime.create({
    bus,
    from,
    to,
    price,
    startTime,
    endTime,
  });

  return Response.json(busTime);
}
