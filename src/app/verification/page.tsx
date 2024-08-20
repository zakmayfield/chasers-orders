import { Verification } from './Verification';
import { getAuthSession } from '@/lib/auth/auth.options';

export default async function Page() {
  const session = await getAuthSession();

  return (
    <div>
      <Verification email={session ? session.user.email! : undefined} />
    </div>
  );
}
