import BlogCard from "../components/BlogCard";

interface Blog {
  userId: number;
  id: string;
  title: string;
  body: string;
  imgUrl: string;
}

const BlogsList = async () => {
  const response = await fetch(`${process.env.BACKEND_API}/posts`);
  const blogs = await response.json();

  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {blogs.map((blog: Blog) => (
          <div key={blog.id}>
            <BlogCard
              title={blog.title}
              id={blog.id}
              imgUrl={blog.imgUrl || "https://placehold.net/600x400.png"}
              body={blog.body}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default BlogsList;
