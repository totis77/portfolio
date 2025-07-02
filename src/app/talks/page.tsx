import { getTalks, Talk } from '@/lib/talks';

const TalkCard = ({ talk }: { talk: Talk }) => (
    <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold">{talk.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mt-1">{talk.event}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{talk.date} - {talk.location}</p>
        {talk.url && (
            <div className="mt-4">
                <a href={talk.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Presentation &rarr;
                </a>
            </div>
        )}
    </div>
);

export default function TalksPage() {
  const talks = getTalks();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Talks & Presentations
        </h1>
      </div>
      <div className="py-8 space-y-6">
        {talks.map((talk, index) => (
          <TalkCard key={index} talk={talk} />
        ))}
      </div>
    </div>
  );
}
