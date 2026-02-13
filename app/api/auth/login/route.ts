import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const user = await request.json();
  if (user.email === "john@gmail.com" && user.password === "1234567890") {
    const res = NextResponse.json({status:200, message: "login success", user });
    res.cookies.set({ name: "login", value: "success" });
    return res;
  } else {
    const res = NextResponse.json({status:401, message: "invalid credentials" });
    res.cookies.delete("login");
    return res;
  }
}
