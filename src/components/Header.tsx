import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label="Panayiotis Charalambous">
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <img
                src="/images/profile-panayiotis.jpg"
                alt="logo"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              Panayiotis Charalambous
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
