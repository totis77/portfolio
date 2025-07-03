import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const contentDirectory = path.join(process.cwd(), 'src/content');

export interface NewsContent {
  title: string;
  contentHtml: string;
}

export async function getNewsContent(): Promise<NewsContent> {
  const newsPath = path.join(contentDirectory, 'news.md');
  const fileContents = fs.readFileSync(newsPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use marked to convert markdown into HTML string
  const contentHtml = await marked(matterResult.content);

  // Combine the data with the id
  return {
    title: matterResult.data.title,
    contentHtml,
  };
}
