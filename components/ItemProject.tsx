'use client';
import { Project, useSelectedProjectStore } from "@/hooks/useSelectedProject";
import ButtonProjectLink from "./ButtonProjectLink";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
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
    linkAppstore?: string;
    linkExternal?: string;
}

export default function ItemProject({ id, title, image, video, icon, description, linkBlog, linkGithub, linkRelease, linkPlaystore, linkAppstore, linkExternal }: ItemProjectProps) {
    const router = useRouter();
    const { setProject } = useSelectedProjectStore();
    const [isHovering, setIsHovering] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    function handleProjectClick() {
        if (linkExternal) {
            window.open(linkExternal, "_blank");
            return;
        }
        const selectedProject = new Project(
            id, "", title, image, icon, description,
            linkBlog, linkGithub, linkPlaystore, linkAppstore, linkRelease, ""
        );
        setProject(selectedProject);
        router.push(`/projects/${id}`);
    }

    const handleVideoClick = useCallback(() => {
        if (video) {
            setDialogOpen(true);
        }
    }, [video]);

    const handleCloseDialog = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setDialogOpen(false);
    }, []);

    return (
        <>
            <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group flex flex-col rounded bg-surface transition-all duration-300 hover:bg-subtle overflow-hidden"
            >
                <div className="relative aspect-video w-full overflow-hidden cursor-pointer">
                    <VideoPlayer src={video} thumbnail={image} isHovering={isHovering} onVideoClick={handleVideoClick} />
                </div>

                <div onClick={handleProjectClick} className="p-4 flex flex-col gap-2 flex-1 cursor-pointer">
                    <div className="flex items-center gap-2.5">
                        <img src={icon} alt="" className="w-5 h-5 object-contain rounded" />
                        <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors duration-200">{title}</span>
                    </div>

                    <p className="text-xs leading-relaxed text-text-secondary line-clamp-2">
                        {description}
                    </p>

                    <div className="flex-grow" />

                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {linkGithub && <ButtonProjectLink title="Github" link={linkGithub} />}
                        {linkRelease && <ButtonProjectLink title="Live Demo" link={linkRelease} />}
                        {linkBlog && <ButtonProjectLink title="Details" link={linkBlog} />}
                        {linkPlaystore && <ButtonProjectLink title="Playstore" link={linkPlaystore} />}
                        {linkAppstore && <ButtonProjectLink title="App Store" link={linkAppstore} />}
                    </div>
                </div>
            </div>

            {dialogOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 cursor-pointer"
                    onClick={handleCloseDialog}
                >
                    <button
                        onClick={handleCloseDialog}
                        className="absolute top-4 right-4 text-text-secondary hover:text-text-primary text-2xl z-10 w-10 h-10 flex items-center justify-center"
                    >
                        &times;
                    </button>
                    <video
                        src={video}
                        autoPlay
                        controls
                        loop
                        playsInline
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-[90vw] max-h-[90vh] rounded cursor-default"
                    />
                </div>
            )}
        </>
    );
}
