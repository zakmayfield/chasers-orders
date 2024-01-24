// import NoticeModal from '@/features/NoticeModal';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import Link from 'next/link';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getAuthSession();
  const notice = searchParams.notice;

  const user = await db.user.findUnique({
    where: {
      email: session!.user.email!,
    },
  });

  return (
    <div className='flex flex-col gap-6 mt-6'>
      <p>Hello {session!.user.email}</p>

      <p>
        Account status: {user?.isApproved ? 'Approved' : 'Pending Approval'}
      </p>

      <div>
        <div>
          Email status:{' '}
          {user?.emailVerified ? 'Verified' : 'Awaiting verification'}
        </div>
      </div>

      <div>
        <Link href='/bar' className='border p-2 rounded'>
          Test Bar
        </Link>
      </div>

      {/* {notice && <NoticeModal notice={notice} />} */}
    </div>
  );
}
