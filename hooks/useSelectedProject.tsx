import { create } from "zustand";


export class Project {
  constructor(
    public id: string,
    public date: string,
    public title: string,
    public image: string,
    public icon: string,
    public description: string,
    public linkBlog: string,
    public linkGithub: string,
    public linkPlaystore: string,
    public linkRelease: string,
    public contentHtml: string
  ) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.image = image;
    this.icon = icon;
    this.description = description;
    this.linkBlog = linkBlog;
    this.linkGithub = linkGithub;
    this.linkPlaystore = linkPlaystore;
    this.linkRelease = linkRelease;
    this.contentHtml = contentHtml;
  }
}

interface ProjectProps {
  project: Project;
  setProject: (project: Project) => void;
}
export const useSelectedProjectStore = create<ProjectProps>((set) => ({
  project: {
    id: "",
    date: "",
    title: "",
    image: "",
    icon: "",
    description: "",
    linkBlog: "",
    linkGithub: "",
    linkPlaystore: "",
    linkRelease: "",
    contentHtml: "",
  },
  setProject: (project) => set({ project }),
}  
));
