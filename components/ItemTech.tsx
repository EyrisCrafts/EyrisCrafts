interface Props {
  title: string;
}

export default function ItemTech({ title }: Props) {
  return (
    <span className="inline-block px-3 py-1.5 text-xs font-medium text-text-secondary bg-subtle rounded">
      {title}
    </span>
  );
}
