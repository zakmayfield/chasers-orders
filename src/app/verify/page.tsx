import { Verify } from '@/features/verify';
import { getAuthSession } from '@/lib/auth/auth.options';

export default async function Page() {
  const session = await getAuthSession();

  return (
    <div>
      <Verify
        email={session?.user.email}
        isVerified={session?.user.emailVerified}
      />
    </div>
  );
}
