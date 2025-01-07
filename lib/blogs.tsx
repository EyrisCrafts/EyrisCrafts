import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { BlogMeta } from "./types";

const blogDirectory = path.join(process.cwd(), "blogs");

export function getSortedBlogsData() {
  // Get directory names under /projects
  const dirNames = fs.readdirSync(blogDirectory);
  const allBlogsData = dirNames.flatMap((dirName) => {
    // Construct the path to the project's folder
    const blogsFolderPath = path.join(blogDirectory, dirName);
    // Check if the path is a directory
    if (fs.statSync(blogsFolderPath).isDirectory()) {
      // Assuming there's only one md file per project folder
      const blogFiles = fs
        .readdirSync(blogsFolderPath)
        .filter((file) => file.endsWith(".md"));
      return blogFiles.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(blogsFolderPath, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the project metadata section
        const matterResult = matter(fileContents);

        const blog = {
          id,
          // Fallback values are provided for missing data fields
          date: matterResult.data.date || "",
          title: matterResult.data.title || "",
        };

        return blog;
      });
    }
    return []; // In case the path is not a directory, return an empty array to avoid errors
  });

  // Sort projects by date
  return allBlogsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getBlogMeta(id: string) : BlogMeta {
  const fullPath = path.join(blogDirectory + `/${id}`, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    title: matterResult.data.title || '',
    image: matterResult.data.image || '',
    description: matterResult.data.description || '',
  }
}


export async function getBlogData(id: string) {
  const fullPath = path.join(blogDirectory + `/${id}`, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  return marked(matterResult.content);
}
