import { Suspense } from "react";
import BlogsList from "../components/BlogsList";
import Link from "next/link";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoadingMui from "../muiComponent/LoadingMui";

const blog = () => {
  return (
    <div>
      <Suspense fallback={<LoadingMui />}>
        <BlogsList />
      </Suspense>
      <div className="fixed bottom-22 right-7">
        <Link href="/create-blog">
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </div>
  );
};
export default blog;
