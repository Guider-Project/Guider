import { dbConnect } from "@/lib/dbConnect";
import { Bus } from "@/models/bus";

export async function GET(request) {
  await dbConnect();

  const busses = await Bus.find({});
  return Response.json(busses);
}

export async function POST(request) {
  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { name, bus_number, route, owner, driver, contact, price, seats } = res;

  if (!name || !bus_number || !route || !owner || !driver || !contact || !price || !seats) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  const data = {
    name: res.name,
    bus_number: res.bus_number,
    route: res.route,
    owner: res.owner,
    driver: res.driver,
    contact: res.contact,
    price: res.price,
    seats: res.seats,
  };

  const bus = new Bus(data);
  await bus.save();

  return Response.json({ message: "Bus created" });
}

export async function PUT(request) {
  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { id, name, bus_number, route, owner, driver, contact, price, seats } = res;

  if (!id || !name || !bus_number || !route || !owner || !driver || !contact || !price || !seats) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  const data = {
    name: res.name,
    bus_number: res.bus_number,
    route: res.route,
    owner: res.owner,
    driver: res.driver,
    contact: res.contact,
    price: res.price,
    seats: res.seats,
  };

  await Bus.findByIdAndUpdate(id, data);

  return Response.json({ message: "Bus updated" });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  await Bus.findByIdAndDelete(id);

  return Response.json({ message: "Bus deleted" });
}
