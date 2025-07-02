import { getProjects, Project } from '@/lib/projects';
import Link from 'next/link';

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200 flex flex-col">
    <div className="flex justify-between items-start mb-2">
      <h2 className="text-2xl font-semibold flex-1">{project.title}</h2>
      <span className="ml-4 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded-full whitespace-nowrap">
        {project.duration}
      </span>
    </div>
    <div className="mb-2">
      <p className="text-gray-700 dark:text-gray-300 font-semibold">{project.role}</p>
      {project.funding && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Funding: {project.funding}</p>
      )}
    </div>
    {project.thumbnail && (
      <img
        src={project.thumbnail}
        alt={`${project.title} thumbnail`}
        className="w-full h-48 object-cover rounded-md my-4"
      />
    )}
    <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>
    <div className="mt-auto">
      <Link href={`/projects/${project.id}`} className="text-blue-500 hover:underline font-semibold">
        Read More &rarr;
      </Link>
    </div>
  </div>
);

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Projects
        </h1>
      </div>
      <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
