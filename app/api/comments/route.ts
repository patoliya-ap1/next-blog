import { NextResponse } from "next/server";
export async function GET() {
  const postsComments = [
    { postID: "1", comments: [{ comment: "best blog for improvement" }] },
  ];
  return NextResponse.json({ postsComments });
}
