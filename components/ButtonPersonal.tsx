'use client';
interface Props {
  icon: React.ReactNode;
  text: string;
  link: string;
}

export default function ButtonPersonal({  icon, text, link }: Props) {
  const handleClick = () => {
    // call link
    window.open(link, "_blank");
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 w-32 rounded-lg shadow-project hover:shadow-projectHovered transition duration-300 flex items-center gap-2 justify-center text-smol-bg bg:bg-card-bg dark:bg-slate-800 dark:hover:bg-slate-900 "
      
    >
      {icon}
      {text}
    </button>
  );
}
