import { getBio } from '@/lib/bio';
import { getPublications } from '@/lib/publications';
import ResumeClient from './ResumeClient';

export default async function ResumePage() {
  const bio = await getBio();
  const publications = getPublications();

  return <ResumeClient bio={bio} publications={publications} />;
}
