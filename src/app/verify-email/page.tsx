import VerifyEmail from '@/features/VerifyEmail';
import { getAuthSession } from '@/lib/nextAuth/auth';
import { db } from '@/lib/db';

export default async function Page() {
  const session = await getAuthSession();

  return (
    <div>
      <div>Verify Email</div>

      <VerifyEmail session={session} />
    </div>
  );
}
