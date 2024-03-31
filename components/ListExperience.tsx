import { getExperiences } from "@/lib/projects";
import ItemExperience from "./ItemExperience";

export default function ListExperience() {
  const experiences = getExperiences();

  return (
    <div>
      {experiences.map((experience) => (
        <ItemExperience
          key={experience.id}
          title={experience.title}
          company={experience.company}
          location={experience.location}
          date={experience.date}
          description={experience.description}
          techStack={experience.techStack}
        />
      ))}
    </div>
  );
}
