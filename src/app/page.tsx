import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Welcome
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          This is the personal portfolio of Panayiotis Charalambous, a researcher in computer animation.
        </p>
      </div>
      <div className="py-12">
        <Link
          href="/resume"
          className="inline-block px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          View My Resume
        </Link>
      </div>
    </div>
  );
}
