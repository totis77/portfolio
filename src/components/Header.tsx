import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import { getBio } from '@/lib/bio';

const Header = () => {
  const bio = getBio();

  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={bio.name}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <img
                src={bio.image}
                alt="logo"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              {bio.name}
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <Link href="/resume" className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block">
          Resume
        </Link>
        <Link href="/publications" className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block">
          Publications
        </Link>
        <Link href="/projects" className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block">
          Projects
        </Link>
        <Link href="/talks" className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block">
          Talks
        </Link>
        <Link href="/news" className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block">
          News
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
