'use client';
import { useRouter } from "next/navigation";

interface ItemBlogProps {
  title: string;
  date: string;
  id: string;
  special?: boolean;
}

export default function ItemBlog({ title, date, id, special = false }: ItemBlogProps) {
    const router = useRouter();
    function handleBlogclick() {
        // Navigate to project page
        if (special){
          router.push(`/blog/${id}`);
        } else {
          router.push(`/blogs/${id}`);
        }
    }
    
  return (
    <div className="flex gap-4 w-full">
      <div className="flex-none text-date-grey dark:text-blog-color w-32">{date}</div>
      <div className="flex-grow">
        <a className="text-sl text-blog-color dark:text-date-grey dark:hover:text-gray-100 hover:text-neutral-400 cursor-pointer" onClick={handleBlogclick} target="_blank" rel="noreferrer">
          {title}
        </a>
      </div>
    </div>
  );
}
