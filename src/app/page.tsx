import { SignIn } from '@/features/auth/signin/SignIn';
import GridContainer from '@/features/shared/GridContainer';
import { getAuthSession } from '@/lib/auth/auth.options';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();

  const user = session?.user;

  if (user) {
    redirect('/dashboard');
  }

  return (
    <GridContainer cols={12}>
      <SignIn />
    </GridContainer>
  );
}
