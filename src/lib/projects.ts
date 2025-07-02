import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const contentDirectory = path.join(process.cwd(), 'src/content');

export interface Project {
  id: string;
  title: string;
  role: string;
  duration: string;
  funding?: string;
  description: string;
  technologies: string[];
  project_page?: string;
  video?: string;
  thumbnail?: string;
  images?: string[];
}

export function getProjects(): Project[] {
  const projectsPath = path.join(contentDirectory, 'projects.yaml');
  const projectsContent = fs.readFileSync(projectsPath, 'utf8');
  const projects = yaml.load(projectsContent) as Project[];
  return projects;
}
