import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import {remark} from 'remark';
import html from 'remark-html';

import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';

import {marked} from 'marked';

const projectsDirectory = path.join(process.cwd(), 'projects');

export function getSortedProjectsData() {
  // Get directory names under /projects
  const dirNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = dirNames.flatMap(dirName => {
    // Construct the path to the project's folder
    const projectFolderPath = path.join(projectsDirectory, dirName);
    // Check if the path is a directory
    if (fs.statSync(projectFolderPath).isDirectory()) {
      // Assuming there's only one md file per project folder
      const projectFiles = fs.readdirSync(projectFolderPath).filter(file => file.endsWith('.md'));
      return projectFiles.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(projectFolderPath, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the project metadata section
        const matterResult = matter(fileContents);

        // Assuming "Project" type is defined elsewhere with the appropriate fields
        const project = {
          id,
          // Fallback values are provided for missing data fields
          date: matterResult.data.date || '',
          title: matterResult.data.title || '',
          image: matterResult.data.image || '',
          icon: matterResult.data.icon || '',
          description: matterResult.data.description || '',
          linkBlog: matterResult.data.linkBlog || '',
          linkGithub: matterResult.data.linkGithub || '',
          linkPlaystore: matterResult.data.linkPlaystore || '',
          linkRelease: matterResult.data.linkRelease || ''
        };

        return project;
      });
    }
    return []; // In case the path is not a directory, return an empty array to avoid errors
  });

  // Sort projects by date
  return allProjectsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else {
      return -1;
    }
  });
}


export async function getProjectData(id: string) {


  const fullPath = path.join(projectsDirectory + `/${id}`, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  
  const matterResult = matter(fileContents);

  return marked(matterResult.content)

    const processedContent = await remark()
      .use(html)
      .use(remarkRehype, {allowDangerousHtml: true})
      .use(rehypeRaw) // Pass raw HTML through
      .use(rehypeStringify) // Stringify HTML
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

  const projectWithHtml: Project & { contentHtml: string } = {
    id,
    date: matterResult.data.date || '',
    title: matterResult.data.title || '',
    image: matterResult.data.image || '',
    icon: matterResult.data.icon || '',
    description: matterResult.data.description || '',
    linkBlog: matterResult.data.linkBlog || '',
    linkGithub: matterResult.data.linkGithub || '',
    linkPlaystore: matterResult.data.linkPlaystore || '',
    linkRelease: matterResult.data.linkRelease || '',
    contentHtml,
    
  };
  return projectWithHtml;
}

export function getTechStacks(): string[] {
  const filePath = path.join(process.cwd(), "public/data", "techStack.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data.tech;
}

interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  date: string;
  description: string;
  techStack: string[];
}

export function getExperiences(): Experience[] {
  const filePath = path.join(process.cwd(), "public/data", "experiences.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data.experiences;
}