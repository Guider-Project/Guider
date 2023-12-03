import { dbConnect } from "@/lib/dbConnect";
import { BusTime } from "@/models";

import { verifyJWT } from "@/utils/jwt";

export async function GET(request) {
  await dbConnect();

  const busTimes = await BusTime.find({});
  return Response.json(busTimes);
}

export async function POST(request) {
  await dbConnect();

  const headers = request.headers;
  const authorization = headers.get("authorization");
  if (!authorization) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let token = null;
  try {
    const bearer = authorization.split(" ")[1];
    token = verifyJWT(bearer, process.env.NEXTAUTH_SECRET);
    if (!token) return Response.json({ error: "Invalid token" }, { status: 400 });
  } catch (e) {
    return Response.json({ error: "Invalid token" }, { status: 400 });
  }

  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { bus, from, to, price, startTime, endTime, userId } = res;

  if (!bus || !from || !to || !price || !startTime || !endTime)
    return Response.json({ error: "Missing data" }, { status: 400 });

  if (userId !== token.data._id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const busTimeExists = await BusTime.findOne({
    bus,
    from,
    to,
    price,
    startTime,
    endTime,
    userId,
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
    userId,
  });

  return Response.json(busTime);
}

export async function PUT(request) {
  await dbConnect();

  const headers = request.headers;
  const authorization = headers.get("authorization");
  if (!authorization) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let token = null;
  try {
    const bearer = authorization.split(" ")[1];
    token = verifyJWT(bearer, process.env.NEXTAUTH_SECRET);
    if (!token) return Response.json({ error: "Invalid token" }, { status: 400 });
  } catch (e) {
    return Response.json({ error: "Invalid token" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");
  if (!_id) return Response.json({ error: "Missing data" }, { status: 400 });

  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { bus, from, to, price, startTime, endTime, userId } = res;
  if (!_id || !bus || !from || !to || !price || !startTime || !endTime || !userId)
    return Response.json({ error: "Missing data" }, { status: 400 });

  if (userId !== token.data._id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const busTime = await BusTime.findOne({ _id });
  if (!busTime) return Response.json({ error: "Bus time not found" }, { status: 400 });

  const updatedBusTime = await BusTime.findOneAndUpdate(
    { _id },
    {
      bus,
      from,
      to,
      price,
      startTime,
      endTime,
    },
    { new: true },
  );

  return Response.json(updatedBusTime);
}

export async function DELETE(request) {
  await dbConnect();

  const headers = request.headers;
  const authorization = headers.get("authorization");
  if (!authorization) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let token = null;
  try {
    const bearer = authorization.split(" ")[1];
    token = verifyJWT(bearer, process.env.NEXTAUTH_SECRET);
    if (!token) return Response.json({ error: "Invalid token" }, { status: 400 });
  } catch (e) {
    return Response.json({ error: "Invalid token" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");

  const busTime = await BusTime.findOne({ _id });
  if (!busTime) return Response.json({ error: "Bus time not found" }, { status: 400 });

  if (busTime.userId.toString() !== token.data._id)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await BusTime.deleteOne({ _id });

  return Response.json({ status: true });
}
