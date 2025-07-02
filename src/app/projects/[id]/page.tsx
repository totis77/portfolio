import { getProjects, Project } from '@/lib/projects';

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

const getProject = (id: string): Project | undefined => {
  const projects = getProjects();
  return projects.find((project) => project.id === id);
};

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProject(params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {project.title}
        </h1>
      </div>
      <div className="py-8">
        <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">{project.description}</p>
        
        {project.video && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Video</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={project.video.replace("watch?v=", "embed/")}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        )}

        {project.images && project.images.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.title} gallery image ${index + 1}`}
                  className="w-full h-auto object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-gray-200 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
