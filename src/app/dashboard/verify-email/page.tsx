import VerifyEmail from '@/features/dashboard/pages/verify-email/VerifyEmail';
import { getAuthSession } from '@/lib/auth/auth.options';

export default async function Page() {
  const session = await getAuthSession();

  return (
    <div>
      <VerifyEmail session={session} />
    </div>
  );
}
