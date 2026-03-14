import ItemProject from "./ItemProject";
import { getSortedProjectsData } from "@/lib/projects";

export default function ListProjects() {
    const projects = getSortedProjectsData();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project) => (
                <ItemProject
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    image={project.image}
                    video={project.video}
                    icon={project.icon}
                    description={project.description}
                    linkBlog={project.linkBlog}
                    linkGithub={project.linkGithub}
                    linkRelease={project.linkRelease}
                    linkPlaystore={project.linkPlaystore}
                    linkAppstore={project.linkAppstore}
                    linkExternal={project.linkExternal}
                />
            ))}
        </div>
    );
}
