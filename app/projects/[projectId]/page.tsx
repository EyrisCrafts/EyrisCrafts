import ButtonBack from "@/components/ButtonBack";
import { getSortedProjectsData, getProjectData, getProjectLinks } from "@/lib/projects";
import { notFound } from "next/navigation";
import ButtonPersonal from "@/components/ButtonPersonal";
import { IoMdHome } from "react-icons/io";
import { IoLogoGithub, IoLogoGooglePlaystore, IoLogoAppleAppstore } from "react-icons/io5";
import { FaLink } from "react-icons/fa";

export default async function Project({ params }: { params: { projectId: string } }) {
    const projects = getSortedProjectsData();
    const projectId = params.projectId;

    if (!projects.find((project) => (project.id === projectId))) {
        return notFound();
    }

    const project = await getProjectData(projectId);
    const projectLinks = getProjectLinks(projectId);

    return (
        <main className="max-w-5xl mx-auto px-2 md:px-3 py-16 md:py-24">
            <div className="mb-10">
                <ButtonPersonal
                    text="Home"
                    link="/"
                    icon={<IoMdHome size={18} />}
                    shouldOpenNewTab={false}
                />
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
                {projectLinks.linkGithub !== "" && (
                    <ButtonPersonal
                        text="Source"
                        link={projectLinks.linkGithub}
                        icon={<IoLogoGithub size={18} />}
                    />
                )}
                {projectLinks.linkPlaystore !== "" && (
                    <ButtonPersonal
                        text="Playstore"
                        link={projectLinks.linkPlaystore}
                        icon={<IoLogoGooglePlaystore size={18} />}
                    />
                )}
                {projectLinks.linkAppstore !== "" && (
                    <ButtonPersonal
                        text="App Store"
                        link={projectLinks.linkAppstore}
                        icon={<IoLogoAppleAppstore size={18} />}
                    />
                )}
                {projectLinks.linkRelease !== "" && (
                    <ButtonPersonal
                        text="Link"
                        link={projectLinks.linkRelease}
                        icon={<FaLink size={18} />}
                    />
                )}
            </div>

            <article className="markdown">
                <section dangerouslySetInnerHTML={{ __html: project }} />
            </article>
        </main>
    );
}
