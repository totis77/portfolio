'use client';

import { Bio } from '@/lib/bio';

export default function ResumeClient({ bio }: { bio: Bio }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Resume
          </h1>
          <div className="flex gap-4">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 print:hidden"
            >
              Print
            </button>
            <a
              href="/panayiotis-cv-2023.pdf"
              download="panayiotis-cv-2023.pdf"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 print:hidden"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
        {/* Left Sidebar */}
        <div className="md:col-span-1 space-y-8">
          <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800 flex flex-col items-center text-center">
            <img src={bio.image} alt={bio.name} className="h-48 w-48 rounded-full mb-4" />
            <h3 className="text-2xl font-bold leading-8 tracking-tight">{bio.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{bio.title}</p>
            <a href={`mailto:${bio.email}`} className="text-sm text-blue-500 hover:underline mt-4">
              {bio.email}
            </a>
          </div>
          <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {bio.skills.map((skill, index) => (
                <span key={index} className="bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:col-span-3 space-y-8">
          <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <div
              className="prose max-w-none dark:prose-dark"
              dangerouslySetInnerHTML={{ __html: bio.aboutHtml }}
            />
          </div>
          <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4">Research Interests</h2>
            <div
              className="prose max-w-none dark:prose-dark"
              dangerouslySetInnerHTML={{ __html: bio.researchInterestsHtml }}
            />
          </div>
          <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4">Current Focus</h2>
            <div
              className="prose max-w-none dark:prose-dark"
              dangerouslySetInnerHTML={{ __html: bio.currentFocusHtml }}
            />
          </div>
          <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <div className="space-y-6">
              {bio.experience.map((exp, index) => (
                <div key={index} className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{exp.institution}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{exp.duration}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <div className="space-y-6">
              {bio.education.map((edu, index) => (
                <div key={index} className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{edu.institution}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{edu.duration}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4">Teaching</h2>
            <div className="space-y-6">
              {bio.teaching.map((item, index) => (
                <div key={index} className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold">{item.role} at {item.institution}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.duration}</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    {item.courses.map((course, i) => (
                      <li key={i}>{course}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


