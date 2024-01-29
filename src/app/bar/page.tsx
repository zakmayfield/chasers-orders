import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/prisma.db';

export default async function Page() {
  return <div className='flex flex-col gap-6 mt-12'>BAR</div>;
}
