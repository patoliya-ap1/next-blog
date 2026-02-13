import BlogDetails from "@/app/components/BlogDetails";
import { Suspense } from "react";
import Link from "next/link";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoadingMui from "@/app/muiComponent/LoadingMui";

interface Params {
  blogID: string;
}

interface SearchParams {
  title: string;
}

const blogDetails = async ({
  params,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const { blogID } = await params;

  return (
    <div className=" lg:flex justify-center">
      <div className="lg:w-[70%]">
        <Suspense fallback={<LoadingMui />}>
          <BlogDetails blogID={blogID} />
        </Suspense>
        <div className="fixed bottom-22 right-7">
          <Link href="/create-blog">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default blogDetails;
