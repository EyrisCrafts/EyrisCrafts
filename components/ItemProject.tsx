'use client';
import { Project, useSelectedProjectStore } from "@/hooks/useSelectedProject";
import ButtonProjectLink from "./ButtonProjectLink";
import { useRouter } from "next/navigation";

import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

interface ItemProjectProps {
    id: string;
    title: string;
    image: string;
    video?: string;
    icon: string;
    description: string;
    linkBlog?: string;
    linkGithub?: string;
    linkRelease?: string;
    linkPlaystore?: string;
}

export default function ItemProject({ id, title, image, video, icon, description, linkBlog, linkGithub, linkRelease, linkPlaystore }: ItemProjectProps) {
    const router = useRouter();
    const { setProject } = useSelectedProjectStore();
    
    function handleProjectClick() {
        const selectedProject = new Project(
            id,
            "",
            title,
            image,
            icon,
            description,
            linkBlog,
            linkGithub,
            linkPlaystore,
            linkRelease,
            ""
            
          );
        setProject(selectedProject);
        // console.log("Project Clicked");
        // // Navigate to project page
        router.push(`/projects/${id}`);
    }

    const [isHovering, setIsHovering] =  useState(false);

    const onMouseEnter = () => {
        setIsHovering(true);

    };

    const onMouseLeave = () => {
        setIsHovering(false);

    }


    
    return (
        <div onClick={handleProjectClick} className="h-72 flex flex-col p-4 rounded-md bg-card-bg w-64 shadow-project hover:cursor-pointer hover:shadow-projectHovered transition-shadow duration-300 dark:bg-custom-bg">
            
            <div className="flex justify-center mb-3 object-center " onPointerEnter={onMouseEnter} onPointerLeave={onMouseLeave}>
               
                <VideoPlayer src={video} thumbnail={image} />
                {/* <img src={image} alt="Image" className="object-center max-w-full max-h-full" /> */}
               
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