interface Props {
  title: string;
  link: string;
}

export default function ButtonProjectLink({ title, link }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    window.open(link, "_blank");
    event.stopPropagation();
  };

  return (
    <span
      onClick={handleClick}
      className="inline-block px-2.5 py-1 text-[11px] font-medium rounded text-text-secondary bg-page hover:text-accent transition-colors duration-200 cursor-pointer"
    >
      {title}
    </span>
  );
}
