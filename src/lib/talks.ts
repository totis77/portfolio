import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const contentDirectory = path.join(process.cwd(), 'src/content');

export interface Talk {
  title: string;
  event: string;
  date: string;
  location: string;
  url?: string;
}

export function getTalks(): Talk[] {
  const talksPath = path.join(contentDirectory, 'talks.yaml');
  const talksContent = fs.readFileSync(talksPath, 'utf8');
  const talks = yaml.load(talksContent) as Talk[];
  // Sort talks by date, most recent first
  return talks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
