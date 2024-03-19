import AccountPending from '@/features/dashboard/account-pending/AccountPending';
import { getAuthSession } from '@/lib/auth/auth.options';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getAuthSession();

  if (!session || !session.user) {
    redirect('/');
  }

  return <AccountPending isApproved={session.user.isApproved} />;
}
