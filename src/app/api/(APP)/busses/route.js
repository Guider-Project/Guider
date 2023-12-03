import { dbConnect } from "@/lib/dbConnect";
import { Bus, BusTime } from "@/models";

import { verifyJWT } from "@/utils/jwt";

export async function GET(request) {
  await dbConnect();

  const busses = await Bus.find({});
  return Response.json(busses);
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

  const { name, plateNumber, phoneNumber, seats, userId } = res;
  if (!name || !plateNumber || !phoneNumber || !seats || !userId)
    return Response.json({ error: "Missing data" }, { status: 400 });

  if (userId !== token.data._id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const bus = await Bus.findOne({ plateNumber });
  if (bus) return Response.json({ error: "Bus already exists" }, { status: 400 });

  const newBus = await Bus.create({
    name,
    plateNumber,
    phoneNumber,
    seats,
    userId,
  });

  return Response.json(newBus);
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

  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");

  const { name, plateNumber, phoneNumber, seats, userId } = res;
  if (!_id || !name || !plateNumber || !phoneNumber || !seats || !userId)
    return Response.json({ error: "Missing data" }, { status: 400 });

  const bus = await Bus.findOne({ _id });
  if (!bus) return Response.json({ error: "Bus does not exist" }, { status: 400 });
  if (userId !== token.data._id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const busByPlateNumber = await Bus.findOne({ plateNumber });
  if (busByPlateNumber && busByPlateNumber._id !== _id)
    return Response.json({ error: "Bus already exists" }, { status: 400 });

  const updatedBus = await Bus.updateOne(
    { _id },
    {
      name,
      plateNumber,
      phoneNumber,
      seats,
      userId,
    },
  );

  return Response.json(updatedBus);
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

  if (!_id) return Response.json({ error: "Missing data" }, { status: 400 });

  const bus = await Bus.findOne({ _id });
  if (!bus) return Response.json({ error: "Bus does not exist" }, { status: 400 });
  if (token.data._id !== bus.userId.toString())
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await BusTime.deleteMany({ bus: _id });
  const deletedBus = await Bus.deleteOne({ _id });

  return Response.json(deletedBus);
}
