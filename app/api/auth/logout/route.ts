import { NextResponse } from "next/server";
export async function POST() {
  const res = NextResponse.json({ message: "Logout Successfully." });
  res.cookies.delete("login");

  return res;
}
