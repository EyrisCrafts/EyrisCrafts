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

  function handleBlogClick() {
    if (special) {
      router.push(`/blog/${id}`);
    } else {
      router.push(`/blogs/${id}`);
    }
  }

  return (
    <div
      className="flex items-baseline gap-4 w-full py-2.5 group cursor-pointer"
      onClick={handleBlogClick}
    >
      <span className="flex-none text-xs text-text-muted w-28 tabular-nums">
        {date}
      </span>
      <span className="text-sm text-text-secondary group-hover:text-accent transition-colors duration-200">
        {title}
      </span>
    </div>
  );
}
