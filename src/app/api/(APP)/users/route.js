import bcrypt from "bcrypt";

import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models";

export async function POST(request) {
  await dbConnect();

  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { email, password } = res;
  if (!email || !password) return Response.json({ error: "Missing data" }, { status: 400 });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return Response.json({ error: "User not found" }, { status: 400 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return Response.json({ error: "Invalid credentials" }, { status: 400 });

  return Response.json({ status: true });
}
