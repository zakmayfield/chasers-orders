import VerifyEmail from '@/features/VerifyEmail';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/prisma.db';

export default async function Page() {
  const session = await getAuthSession();

  return (
    <div>
      <div>Verify Email</div>

      <VerifyEmail session={session} />
    </div>
  );
}
