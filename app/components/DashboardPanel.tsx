import Link from "next/link";
import BlogsList from "../components/BlogsList";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Suspense } from "react";
import LoadingMui from "../muiComponent/LoadingMui";
const DashboardPanel = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <h5>Blogs</h5>
      <Suspense fallback={<LoadingMui />}>
        <BlogsList user="john@gmail.com" />
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

export default DashboardPanel;
