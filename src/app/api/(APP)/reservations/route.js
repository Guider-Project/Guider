import { dbConnect } from "@/lib/dbConnect";
import { BusTime, Reservation } from "@/models";

import { verifyJWT } from "@/utils/jwt";

export async function GET(request) {
  await dbConnect();

  const reservations = await Reservation.find({});
  return Response.json(reservations);
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

  const { busTime, seats, userId, remarks } = res;
  if (!busTime || !seats || !userId)
    return Response.json({ error: "Missing data" }, { status: 400 });

  if (userId !== token.data._id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const busTimeObj = await BusTime.findById(busTime);
  if (!busTimeObj) return Response.json({ error: "BusTime not found" }, { status: 404 });

  busTimeObj.seats = parseInt(busTimeObj.seats) + parseInt(seats);
  await busTimeObj.save();

  const reservation = await Reservation.create({
    busTime,
    seats,
    userId,
    remarks,
  });

  return Response.json(reservation);
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

  const reservation = await Reservation.findById(_id);
  if (!reservation) return Response.json({ error: "Reservation not found" }, { status: 404 });

  if (reservation.userId.toString() !== token.data._id)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await Reservation.findByIdAndDelete(_id);
  return Response.json({ success: true });
}
