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
    <div className="flex gap-4">
      <div className="text-date-grey dark:text-blog-color">{date}</div>
      <div>
        <a className="text-sl text-blog-color dark:text-date-grey dark:hover:text-gray-100 hover:text-neutral-400 cursor-pointer" onClick={handleBlogclick} target="_blank" rel="noreferrer">
          {title}
        </a>
      </div>
    </div>
  );
}
