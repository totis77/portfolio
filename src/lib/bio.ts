import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const contentDirectory = path.join(process.cwd(), 'src/content');

export interface Bio {
  name: string;
  title: string;
  email: string;
  image: string;
  contentHtml: string;
  experience: { role: string; institution: string; duration: string }[];
  education: { degree: string; institution: string; duration: string }[];
  skills: string[];
  teaching: { institution: string; role: string; duration: string; courses: string[] }[];
}

export function getBio(): Bio {
  const bioPath = path.join(contentDirectory, 'bio.md');
  const fileContents = fs.readFileSync(bioPath, 'utf8');
  const matterResult = matter(fileContents);

  const contentHtml = marked(matterResult.content);

  return {
    name: matterResult.data.name,
    title: matterResult.data.title,
    email: matterResult.data.email,
    image: matterResult.data.image,
    experience: matterResult.data.experience || [],
    education: matterResult.data.education || [],
    skills: matterResult.data.skills || [],
    teaching: matterResult.data.teaching || [],
    contentHtml,
  };
}
