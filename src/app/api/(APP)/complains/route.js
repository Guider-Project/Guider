import { dbConnect } from "@/lib/dbConnect";
import { Complain } from "@/models";

export async function POST(request) {
  await dbConnect();

  const res = await request.json();
  if (!res) return Response.json({ error: "No data provided" }, { status: 400 });

  const { name, phoneNumber, description } = res;
  if (!name || !description) return Response.json({ error: "Missing data" }, { status: 400 });

  const complain = await Complain.create({
    name,
    phoneNumber,
    description,
  });

  return Response.json(complain);
}
