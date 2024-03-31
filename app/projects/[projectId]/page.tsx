import ButtonBack from "@/components/ButtonBack";
import { getSortedProjectsData, getProjectData } from "@/lib/projects";
import { notFound } from "next/navigation";

export default async function Project({ params }: {params : {projectId: string}}) {
    const projects = getSortedProjectsData();
    const projectId = params.projectId;

    if (!projects.find((project) => (project.id === projectId))) {
        return notFound();
    }

    const project = await getProjectData(projectId);

    return (
        <div className="max-w-screen-md container-md mx-auto px-8 flex flex-col justify-center dark:bg-dark-1 bg-grey-3 ">
            <div className="p-8"></div>
            {/* Back button */}
            <ButtonBack />
            <div className="markdown flex flex-col items-center">
                <section dangerouslySetInnerHTML={{ __html: project }} />
            </div>

        </div>
    );
}