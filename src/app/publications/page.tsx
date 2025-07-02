import { getPublications } from '@/lib/publications';
import PublicationsClient from './PublicationsClient';

export default function PublicationsPage() {
  const publications = getPublications();

  return <PublicationsClient allPublications={publications} />;
}
