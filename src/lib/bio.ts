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
  aboutHtml: string;
  researchInterestsHtml: string;
  currentFocusHtml: string;
  experience: { role: string; institution: string; duration: string }[];
  education: { degree: string; institution: string; duration: string }[];
  skills: string[];
  teaching: { institution: string; role: string; duration: string; courses: string[] }[];
}

export async function getBio(): Promise<Bio> {
  const bioPath = path.join(contentDirectory, 'bio.md');
  const fileContents = fs.readFileSync(bioPath, 'utf8');
  const matterResult = matter(fileContents);

  // Split content by headings
  const sections = matterResult.content.split('## ').filter(Boolean);
  const aboutSection = sections.find(s => s.startsWith('About Me'))?.replace('About Me\n\n', '');
  const researchSection = sections.find(s => s.startsWith('Research Interests'))?.replace('Research Interests\n\n', '');
  const focusSection = sections.find(s => s.startsWith('Current Focus'))?.replace('Current Focus\n\n', '');

  return {
    name: matterResult.data.name,
    title: matterResult.data.title,
    email: matterResult.data.email,
    image: matterResult.data.image,
    experience: matterResult.data.experience || [],
    education: matterResult.data.education || [],
    skills: matterResult.data.skills || [],
    teaching: matterResult.data.teaching || [],
    aboutHtml: aboutSection ? await marked(aboutSection) : '',
    researchInterestsHtml: researchSection ? await marked(researchSection) : '',
    currentFocusHtml: focusSection ? await marked(focusSection) : '',
  };
}
