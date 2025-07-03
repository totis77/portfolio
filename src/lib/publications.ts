import fs from 'fs';
import path from 'path';
import Cite from 'citation-js';
import yaml from 'js-yaml';

const contentDirectory = path.join(process.cwd(), 'src/content');

// A mapping from BibTeX entry types to user-friendly names.
const publicationTypeMap: Record<string, string> = {
  'article-journal': 'Journal Article',
  'paper-conference': 'Conference Paper',
  'chapter': 'Book Chapter',
  'book': 'Book',
  'report': 'Technical Report',
  'thesis': 'Thesis',
  'document': 'Document',
};

export interface Publication {
  id: string;
  type: string;
  formatted: string; // To hold the formatted citation
  title: string;
  author: string;
  year: string;
  journal?: string;
  booktitle?: string;
  volume?: string;
  number?: string;
  pages?: string;
  publisher?: string;
  doi?: string;
  url?: string;
  project_page?: string;
  publisher_link?: string; // Added missing property
  tagline?: string;
  video?: string;
  youtube?: string;
  thumbnail?: string;
  animation?: string;
  images?: string[];
  appendix?: string;
  code?: string;
  presentation?: string;
  pdf?: string;
}

export function getPublications(): Publication[] {
  const bibtexPath = path.join(contentDirectory, 'publications.bib');
  const bibtexContent = fs.readFileSync(bibtexPath, 'utf8');
  const mediaPath = path.join(contentDirectory, 'media.yaml');
  const mediaContent = fs.readFileSync(mediaPath, 'utf8');

  const publications = new Cite(bibtexContent);
  const mediaData = yaml.load(mediaContent) as Record<string, any>;

  const allPublications = publications.data.map((p: any) => {
    const id = p.id;
    const media = mediaData[id] || {};
    const year = p.issued?.['date-parts']?.[0]?.[0]?.toString() || '';
    
    let formattedCitation = `<p>Error formatting citation for ${id}</p>`;
    try {
      // Attempt to format the citation
      const citation = new Cite(p).format('bibliography', {
        format: 'html',
        template: 'apa',
        lang: 'en-US'
      });
      // If successful, update the variable
      formattedCitation = citation;
    } catch (e) {
      // If formatting fails, log the error but continue
      if (e instanceof Error) {
        console.error(`Failed to format citation for entry: ${p.id}. Error: ${e.message}`);
      } else {
        console.error(`Failed to format citation for entry: ${p.id}. Unknown error: ${e}`);
      }
    }

    // Highlight the user's name
    const nameToHighlight = /(Charalambous, P\.|Charalambous, Panayiotis)/gi;
    formattedCitation = formattedCitation.replace(nameToHighlight, (match: string) => `<strong>${match}</strong>`);

    return {
      id,
      type: publicationTypeMap[p.type.toLowerCase()] || 'Miscellaneous',
      formatted: formattedCitation,
      title: p.title || 'No Title',
      author: p.author ? p.author.map((a: any) => `${a.given} ${a.family}`).join(', ') : 'No Author',
      year: year,
      journal: p.container_title,
      booktitle: p.event,
      volume: p.volume,
      number: p.issue,
      pages: p.page,
      publisher: p.publisher,
      doi: p.DOI,
      url: p.URL,
      ...media,
    };
  }).sort((a: Publication, b: Publication) => {
    const typeOrder = [
      'Journal Article',
      'Conference Paper',
      'Book',
      'Book Chapter',
      'Technical Report',
      'PhD Thesis',
      'Masters Thesis',
      'Miscellaneous',
    ];

    const typeAIndex = typeOrder.indexOf(a.type);
    const typeBIndex = typeOrder.indexOf(b.type);

    // If types are the same, sort by year descending
    if (typeAIndex === typeBIndex) {
      if (a.year > b.year) return -1;
      if (a.year < b.year) return 1;
      return 0;
    }

    // Otherwise, sort by type order
    return typeAIndex - typeBIndex;
  });

  return allPublications;
}