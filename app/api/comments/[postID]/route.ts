import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ postID: string }> },
) {
  const { postID } = await params;
  console.log(postID);

  const postsComments = [
    {
      postID: "1",
      comments: [
        {
          id: 1,
          comment: "best blog for improvement",
          user: { id: 1, fullName: "John Doe" },
        },
      ],
    },
    {
      postID: "2",
      comments: [
        {
          id: 2,
          comment: "best blog for health",
          user: { id: 2, fullName: "Alice Doe" },
        },
      ],
    },
    {
      postID: "3",
      comments: [
        {
          id: 3,
          comment: "best blog for children",
          user: { id: 3, fullName: "Bob Doe" },
        },
      ],
    },
  ];

  const postComments = postsComments.find(({ postID: id }) => id == postID);
  return NextResponse.json({ postComments });
}
