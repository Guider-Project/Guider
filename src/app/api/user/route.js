import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/user";

export async function GET(request) {
  await dbConnect();

  const users = await User.find({});
  return Response.json(users);
}

export async function POST(request) {
  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { username, password, email, phone_number, type } = res;

  if (!username || !password || !email || !phone_number || !type) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  const data = {
    username: res.username,
    password: res.password,
    email: res.email,
    phone_number: res.phone_number,
    type: res.type,
  };

  const user = new User(data);
  await user.save();

  return Response.json({ message: "User created" });
}

export async function PUT(request) {
  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { id, username, password, email, phone_number, type } = res;

  if (!id || !username || !password || !email || !phone_number || !type) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  const data = {
    username: res.username,
    password: res.password,
    email: res.email,
    phone_number: res.phone_number,
    type: res.type,
  };

  await User.findByIdAndUpdate(id, data);
  return Response.json({ message: "User updated" });
}

export async function DELETE(request) {
  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { id } = res;

  if (!id) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  await User.findByIdAndDelete(id);
  return Response.json({ message: "User deleted" });
}
