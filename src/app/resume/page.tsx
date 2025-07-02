import { getBio } from '@/lib/bio';
import { getPublications } from '@/lib/publications';
import ResumeClient from './ResumeClient';

export default function ResumePage() {
  const bio = getBio();
  const publications = getPublications();

  return <ResumeClient bio={bio} publications={publications} />;
}
