import ItemTech from "./ItemTech";

interface Props {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  techStack: string[];
}

export default function ItemExperience({ title, company, location, date, description, techStack }: Props) {
  return (
    <div className="flex flex-col gap-2 py-6 border-b border-subtle last:border-0">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        <span className="text-xs text-text-muted flex-shrink-0">{date}</span>
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-text-secondary">{company}</span>
        <span className="text-xs text-text-muted flex-shrink-0">{location}</span>
      </div>

      <div
        className="text-sm leading-relaxed text-text-secondary mt-1"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <div className="flex flex-wrap gap-1.5 mt-2">
        {techStack.map((tech) => (
          <ItemTech key={tech} title={tech} />
        ))}
      </div>
    </div>
  );
}
