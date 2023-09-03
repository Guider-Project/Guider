import { NextResponse } from "next/server";

import dbConnect from "@/lib/database";
import { User as UserModel } from "@/models/user";

export async function GET() {
  await dbConnect();

  // Create a new user
  const user = new UserModel({
    username: "test",
    password: "test",
  });

  // Save the user
  await user.save();

  return NextResponse.json({ message: "Hello World" });
}
