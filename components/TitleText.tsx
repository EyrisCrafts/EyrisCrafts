interface Props {
  text: string;
}

export default function TitleText({ text }: Props) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-accent mb-6">
      <span className="text-text-muted mr-1">&gt;</span>{text}
    </h2>
  );
}
