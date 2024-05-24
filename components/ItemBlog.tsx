'use client';
import { useRouter } from "next/navigation";

interface ItemBlogProps {
  title: string;
  date: string;
  id: string;
}

export default function ItemBlog({ title, date, id }: ItemBlogProps) {
    const router = useRouter();
    function handleBlogclick() {
        // Navigate to project page
        router.push(`/blogs/${id}`);
    }
    
  return (
    <div className="flex gap-4 w-full">
      <div className="flex-none text-date-grey dark:text-blog-color w-28">{date}</div>
      <div className="flex-grow">
        <a className="text-sl text-blog-color dark:text-date-grey dark:hover:text-gray-100 hover:text-neutral-400 cursor-pointer" onClick={handleBlogclick} target="_blank" rel="noreferrer">
          {title}
        </a>
      </div>
    </div>
  );
}
