import { Heading } from '@/shared/components/ui';
import { getAuthSession } from '@/lib/auth/auth.options';
import { Verification } from './components';

export default async function Page() {
  const session = await getAuthSession();

  return (
    <div className='flex flex-col gap-3 max-w-sm w-full mx-auto'>
      <Heading as='h6' content='Verification' />
      <Verification email={session ? session.user.email! : undefined} />
    </div>
  );
}
