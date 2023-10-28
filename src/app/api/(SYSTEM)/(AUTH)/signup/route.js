import bcrypt from "bcrypt";

import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models";

export async function POST(request) {
  await dbConnect();

  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { email, password, role } = res;

  if (!email || !password || !role) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const data = {
    email: res.email,
    password: hashedPassword,
    role: res.role,
  };

  const user = new User(data);

  try {
    await user.validate();
    await user.save();

    return Response.json({ message: "User created" });
  } catch (e) {
    console.log("e", e.code);

    if (e.code === 11000) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    return Response.json(
      { error: "Something went wrong. Please try again later." },
      { status: 400 },
    );
  }
}
