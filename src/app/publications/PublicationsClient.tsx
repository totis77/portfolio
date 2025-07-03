'use client';

import { useState, useMemo } from 'react';
import type { Publication } from '@/lib/publications';
import Link from 'next/link';

const PublicationCard = ({ pub }: { pub: Publication }) => (
  <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 flex flex-col md:flex-row gap-6">
    {pub.thumbnail && (
      <div className="md:w-1/4">
        <img
          src={pub.thumbnail}
          alt={`${pub.title} thumbnail`}
          className="w-full h-auto object-cover rounded-md"
        />
      </div>
    )}
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold flex-1">{pub.title}</h2>
        <span className="ml-4 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded-full whitespace-nowrap">
          {pub.type}
        </span>
      </div>
      
      <div 
        className="prose prose-sm dark:prose-dark max-w-none mt-2"
        dangerouslySetInnerHTML={{ __html: pub.formatted }} 
      />

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {pub.journal || pub.booktitle}, {pub.year}
      </p>
      {pub.tagline && <p className="mt-2 text-gray-700 dark:text-gray-300 italic">&quot;{pub.tagline}&quot;</p>}
      
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {pub.project_page && (
          <Link href={pub.project_page} className="text-blue-500 hover:underline">
            Project Page
          </Link>
        )}
        {pub.publisher_link && (
          <a href={pub.publisher_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Publisher
          </a>
        )}
        {pub.pdf && (
          <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            PDF
          </a>
        )}
        {pub.youtube && (
          <a href={pub.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            YouTube
          </a>
        )}
        {pub.video && (
          <a href={pub.video} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Video
          </a>
        )}
        {pub.code && (
          <a href={pub.code} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Code
          </a>
        )}
        {pub.appendix && (
          <a href={pub.appendix} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Appendix
          </a>
        )}
        {pub.presentation && (
          <a href={pub.presentation} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Slides
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function PublicationsClient({ allPublications }: { allPublications: Publication[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const publicationYears = [...new Set(allPublications.map(p => p.year || 'Misc'))].sort((a, b) => b.localeCompare(a));
  const initialCollapsedState = publicationYears.reduce((acc, year, index) => {
    // Keep the first 2 years expanded, collapse the rest
    acc[year] = index >= 2;
    return acc;
  }, {} as Record<string, boolean>);

  const [collapsedYears, setCollapsedYears] = useState<Record<string, boolean>>(initialCollapsedState);

  const publicationTypes = [...new Set(allPublications.map(p => p.type))];

  const filteredPublications = useMemo(() => {
    return allPublications
      .filter(pub => typeFilter === 'All' || pub.type === typeFilter)
      .filter(pub => 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery, typeFilter, allPublications]);

  const groupedPublications = useMemo(() => {
    return filteredPublications.reduce((acc, pub) => {
      const year = pub.year || 'Misc';
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(pub);
      return acc;
    }, {} as Record<string, Publication[]>);
  }, [filteredPublications]);

  const toggleYear = (year: string) => {
    setCollapsedYears(prev => ({ ...prev, [year]: !prev[year] }));
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Publications
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-md dark:bg-gray-800"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-md dark:bg-gray-800"
          >
            <option value="All">All Types</option>
            {publicationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-8 py-8">
        {Object.keys(groupedPublications)
          .sort((a, b) => b.localeCompare(a))
          .map((year) => (
          <div key={year}>
            <h2 
              className="text-2xl font-bold mb-4 cursor-pointer flex items-center"
              onClick={() => toggleYear(year)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 mr-2 transform transition-transform duration-200 ${
                  collapsedYears[year] ? '' : 'rotate-90'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {year} ({groupedPublications[year].length})
            </h2>
            {!collapsedYears[year] && (
              <div className="space-y-4">
                {groupedPublications[year].map((pub) => (
                  <PublicationCard key={pub.id} pub={pub} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

