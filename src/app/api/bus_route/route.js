import { dbConnect } from "@/lib/dbConnect";
import { BusRoute } from "@/models/busRoute";

export async function GET(request) {
  await dbConnect();

  const busRoutes = await BusRoute.find({});
  return Response.json(busRoutes);
}

export async function POST(request) {
  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { route, bus_id, time, price } = res;

  if (!route || !bus_id || !time || !price) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  const data = {
    route: res.route,
    bus_id: res.bus_id,
    time: res.time,
    price: res.price,
  };

  const busRoute = new BusRoute(data);
  await busRoute.save();

  return Response.json({ message: "BusRoute created" });
}

export async function PUT(request) {
  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { id, route, bus_id, time, price } = res;

  if (!id || !route || !bus_id || !time || !price) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  const data = {
    route: res.route,
    bus_id: res.bus_id,
    time: res.time,
    price: res.price,
  };

  await BusRoute.findByIdAndUpdate(id, data);
  return Response.json({ message: "BusRoute updated" });
}

export async function DELETE(request) {
  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { id } = res;

  if (!id) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  await BusRoute.findByIdAndDelete(id);
  return Response.json({ message: "BusRoute deleted" });
}
