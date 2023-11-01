import { dbConnect } from "@/lib/dbConnect";
import { Bus } from "@/models";

export async function GET(request) {
  await dbConnect();

  const busses = await Bus.find({});
  return Response.json(busses);
}

export async function POST(request) {
  await dbConnect();

  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { name, plateNumber, phoneNumber, seats, owner } = res;
  if (!name || !plateNumber || !phoneNumber || !seats || !owner)
    return Response.json({ error: "Missing data" }, { status: 400 });

  const bus = await Bus.findOne({ plateNumber });
  if (bus) return Response.json({ error: "Bus already exists" }, { status: 400 });

  const newBus = await Bus.create({
    name,
    plateNumber,
    phoneNumber,
    seats,
  });

  return Response.json(newBus);
}
