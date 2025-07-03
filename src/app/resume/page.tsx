import { getBio } from '@/lib/bio';
import ResumeClient from './ResumeClient';

export default async function ResumePage() {
  const bio = await getBio();

  return <ResumeClient bio={bio} />;
}
