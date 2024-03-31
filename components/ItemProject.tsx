'use client';
import ButtonProjectLink from "./ButtonProjectLink";
import { useRouter } from "next/navigation";

interface ItemProjectProps {
    id: string;
    title: string;
    image: string;
    icon: string;
    description: string;
    linkBlog?: string;
    linkGithub?: string;
    linkRelease?: string;
    linkPlaystore?: string;
}

export default function ItemProject({ id, title, image, icon, description, linkBlog, linkGithub, linkRelease, linkPlaystore }: ItemProjectProps) {
    const router = useRouter();
    function handleProjectClick() {
        console.log("Project Clicked");
        // Navigate to project page
        router.push(`/projects/${id}`);
    }
    
    return (
        <div onClick={handleProjectClick} className="h-72 flex flex-col p-4 rounded-md bg-card-bg w-64 shadow-project hover:cursor-pointer hover:shadow-projectHovered transition-shadow duration-300 dark:bg-slate-700">
            
            <div className="flex justify-center mb-3">
                <img src={image} alt="Image" className="object-center max-w-full max-h-full" />
            </div>

            <div className="flex gap-3">
                <img src={icon} alt="Image" className="object-contain w-6" />
                <p className="text-slate-500 dark:text-title-grey ">{title}</p>
            </div>
            <p className="text-xs text-title-grey mt-2">{description}</p>
            <div className="flex-grow"></div>
            <div className="flex gap-2 mt-3">
                {
                    linkGithub && <ButtonProjectLink title="Github" link={linkGithub} />
                }
                {
                    linkRelease && <ButtonProjectLink title="Release" link={linkRelease} />
                }
                {
                    linkBlog && <ButtonProjectLink title="Details" link={linkBlog} />
                }
                {
                    linkPlaystore && <ButtonProjectLink title="Playstore" link={linkPlaystore} />
                }
            </div>
        </div>
    );
}