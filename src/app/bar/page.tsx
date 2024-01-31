import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db.prisma-client';

export default async function Page() {
  return <div className='flex flex-col gap-6 mt-12'>BAR</div>;
}
