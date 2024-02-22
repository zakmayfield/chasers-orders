import SignIn from '@/features/auth/SignIn';
import GridContainer from '@/features/ui/layout/GridContainer';
import { getAuthSession } from '@/lib/auth/auth.options';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();

  const user = session?.user;

  if (user) {
    redirect('/products');
  }

  return (
    <GridContainer cols={12}>
      <SignIn />
    </GridContainer>
  );
}
