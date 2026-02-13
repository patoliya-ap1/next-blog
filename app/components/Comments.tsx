"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

const Comments = ({ blogID }: { blogID: string }) => {
  const { data, error, isLoading } = useSWR(
    `/api/comments/${blogID}`,
    fetcher,
  );

  if (isLoading) {
    return <p>loading comments...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  if (data && data?.postComments?.comments?.length == 0) {
    return (
      <div>
        <p className="text-slate-600">No comments for this post</p>
      </div>
    );
  }
  return (
    <div>
      {data && data?.postComments?.comments?.length > 0 && (
        <div>
          {data.postComments.comments.map(
            ({
              id,
              comment,
              user,
            }: {
              comment: string;
              id: number;
              user: { id: string; fullName: string };
            }) => {
              return (
                <div key={id} className="shadow-md p-3">
                  <div className="flex items-center gap-3 mb-2 ">
                    <div className="h-8 w-8 bg-gray-600 rounded-full text-slate-50 flex justify-center items-center">
                      <span>{user.fullName.charAt(0)}</span>
                    </div>
                    <div>
                      <p>{user.fullName}</p>
                    </div>
                  </div>
                  <p className="bg-gray-200 p-2 rounded-md text-sm">
                    {comment}
                  </p>
                </div>
              );
            },
          )}
        </div>
      )}
    </div>
  );
};
export default Comments;
