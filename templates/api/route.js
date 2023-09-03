import { NextResponse } from "next/server";

import dbConnect from "@/lib/database";
import { User as UserModel } from "@/models/user";

// GET /api/test
export async function GET() {
  await dbConnect();

  // Create a new user
  const user = new UserModel({
    username: "test",
    password: "test",
  });

  // Save the user
  await user.save();

  return NextResponse.json({ message: "This is GET request endpoint example" });
}

// POST /api/test
export async function POST() {
  return NextResponse.json({ message: "This is POST request endpoint example" });
}

// PUT /api/test
export async function PUT() {
  return NextResponse.json({ message: "This is PUT request endpoint example" });
}

// DELETE /api/test
export async function DELETE() {
  return NextResponse.json({ message: "This is DELETE request endpoint example" });
}
