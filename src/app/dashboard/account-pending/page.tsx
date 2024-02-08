import AccountPending from '@/features/dashboard/pages/account-pending/AccountPending';
import { getAuthSession } from '@/lib/auth/auth.options';

export default async function Page() {
  const session = await getAuthSession();

  return <AccountPending user={session?.user} />;
}
