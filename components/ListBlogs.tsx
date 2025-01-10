import { getSortedBlogsData } from "@/lib/blogs";
import ItemBlog from "./ItemBlog";
import { readableDate } from "@/utils/utils";
export default function ListBlogs() {
  const blogs = getSortedBlogsData();

  return (
    <div className="flex flex-wrap gap-4">
       <ItemBlog
       special={true}
          key="firebase-notifications-using-cloudflare-workers"
          id="firebase-notifications-using-cloudflare-workers"
          title="Running free firebase notifications cronjob using cloudflare workers"
          date={"January 07, 2025"}
        />
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
