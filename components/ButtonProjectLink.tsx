import Link from "next/link";

interface Props {
  title: string;
  link: string;
}

export default function ButtonProjectLink({ title, link }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => { 
    window.open(link, "_blank");
    event.stopPropagation();
  }
  
    return (
    <div
      onClick={handleClick}

      className="rounded-md card-bg transition duration-300 shadow-projectLink hover:shadow-projectLinkHovered px-3 py-1 text-xs font-bold text-smol-bg dark:bg-custom-button-bg dark:hover:bg-slate-900"
    >
      {title}
    </div>
  );
}
