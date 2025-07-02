import Link from 'next/link';
import Mail from './icons/Mail';
import Github from './icons/Github';
import Twitter from './icons/Twitter';
import Linkedin from './icons/Linkedin';

const Footer = () => {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <a className="text-sm text-gray-500 transition hover:text-gray-600" target="_blank" rel="noopener noreferrer" href="mailto:your.email@example.com">
            <Mail className="h-6 w-6" />
          </a>
          <a className="text-sm text-gray-500 transition hover:text-gray-600" target="_blank" rel="noopener noreferrer" href="https://github.com/your-github">
            <Github className="h-6 w-6" />
          </a>
          <a className="text-sm text-gray-500 transition hover:text-gray-600" target="_blank" rel="noopener noreferrer" href="https://twitter.com/your-twitter">
            <Twitter className="h-6 w-6" />
          </a>
          <a className="text-sm text-gray-500 transition hover:text-gray-600" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/your-linkedin">
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">Your Name</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
