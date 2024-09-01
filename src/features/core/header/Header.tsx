import { LogoLink } from './components';
import { Container } from '@/shared/components/ui';
import { getAuthSession } from '@/lib/auth/auth.options';
import { Navigation } from './components/Navigation';

export const Header = async ({}) => {
  const session = await getAuthSession();

  return (
    <header className='px-6 py-3 font-light bg-light-primary'>
      <Container
        as='div'
        width='xl'
        center={true}
        flex='row'
        className='items-center justify-center'
      >
        <LogoLink />

        {/* <Navigation isAuth={!!session?.user} /> */}
      </Container>
    </header>
  );
};
