import { getSortedBlogsData } from "@/lib/blogs";
import ItemBlog from "./ItemBlog";
import { readableDate } from "@/utils/utils";
export default function ListBlogs() {
  const blogs = getSortedBlogsData();

  return (
    <div className="flex flex-wrap gap-4">
      {blogs.map((blog) => (
        <ItemBlog
          key={blog.id}
          id={blog.id}
          title={blog.title}
          date={readableDate(blog.date)}
        />
      ))}
    </div>
  );
}
