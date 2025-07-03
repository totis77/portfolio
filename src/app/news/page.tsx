import { getNewsContent } from '@/lib/news';

export default async function NewsPage() {
  const { title, contentHtml } = await getNewsContent();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {title}
        </h1>
      </div>
      <div
        className="prose max-w-none py-8 dark:prose-dark"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
