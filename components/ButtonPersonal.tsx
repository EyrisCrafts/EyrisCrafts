'use client';

interface Props {
  icon: React.ReactNode;
  text: string;
  link: string;
  shouldOpenNewTab?: boolean;
}

export default function ButtonPersonal({ icon, text, link, shouldOpenNewTab = true }: Props) {
  const handleClick = () => {
    if (shouldOpenNewTab) {
      window.open(link, "_blank");
    } else {
      window.open(link, "_self");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm text-text-secondary bg-subtle hover:text-accent hover:bg-surface transition-colors duration-200 rounded"
    >
      {icon}
      {text}
    </button>
  );
}
