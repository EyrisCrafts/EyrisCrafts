import ItemProject from "./ItemProject";
import { getSortedProjectsData } from "@/lib/projects";

export default function ListProjects() {
    const projects = getSortedProjectsData();

  return (
    <div className="flex flex-wrap gap-4">
      
        {
            projects.map((project) => (
                <ItemProject
                key={project.id}
                    id = {project.id}
                    title={project.title}
                    image={project.image}
                    icon={project.icon}
                    description={project.description}
                    linkBlog={project.linkBlog}
                    linkGithub={project.linkGithub}
                    linkRelease={project.linkRelease}
                    linkPlaystore={project.linkPlaystore}
                />
            ))
        }
    </div>
  );
}
