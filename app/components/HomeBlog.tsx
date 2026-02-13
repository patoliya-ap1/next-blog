import Image from "next/image";
import { Suspense } from "react";
import LoadingMui from "../muiComponent/LoadingMui";
import BlogsList from "./BlogsList";

const HomeBlog = () => {
  return (
    <div className="">
      <div className="relative w-full h-80">
        <Image
          src={"/images/blogbanner.jpg"}
          alt="post thumbnail"
          fill
          loading="eager"
          className="object-cover rounded-md"
        />
      </div>
      <div className="mt-5">
        <Suspense fallback={<LoadingMui />}>
          <BlogsList />
        </Suspense>
      </div>
    </div>
  );
};
export default HomeBlog;
