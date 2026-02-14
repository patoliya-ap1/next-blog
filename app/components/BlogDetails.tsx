import Comments from "@/app/components/Comments";
import Image from "next/image";
const BlogDetails = async ({ blogID }: { blogID: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/posts/${blogID}`,
  );
  const blog = await response.json();

  console.log(blog);

  return (
    <div className="mb-20">
      <div className="relative w-full h-80">
        <Image
          src={blog.imgUrl || "https://placehold.net/600x400.png"}
          alt="post thumbnail"
          fill
          loading="eager"
          className="object-cover rounded-md"
        />
        <div className="absolute p-4 bg-black w-full opacity-70 bottom-0">
          <h2 className="text-slate-100 opacity-100">{blog.title}</h2>
        </div>
      </div>
      <div className="mt-5 wrap-break-word">
        <pre className="text-balance">{blog.body}</pre>
      </div>
      <div className="mt-5">
        <h5>Comments</h5>

        <Comments blogID={blogID} />
      </div>
    </div>
  );
};
export default BlogDetails;
