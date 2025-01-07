'use client';
interface Props {
  icon: React.ReactNode;
  text: string;
  link: string;
  shouldOpenNewTab?: boolean;
}

export default function ButtonPersonal({  icon, text, link, shouldOpenNewTab=true }: Props) {
  const handleClick = () => {
    // call link
    if (shouldOpenNewTab) {
      window.open(link, "_blank");
    } else {
      window.open(link, "_self");
    }
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 w-32 rounded-lg shadow-project hover:shadow-projectHovered transition duration-300 flex items-center gap-2 justify-center text-smol-bg bg:bg-card-bg dark:bg-custom-bg dark:hover:bg-custom-button-bg "
      
    >
      {icon}
      {text}
    </button>
  );
}
