import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req) {
  const token = await getToken({ req, secret, raw: true });

  return Response.json({ token });
}
