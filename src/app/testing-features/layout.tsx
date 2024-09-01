import { Container } from '@/shared/components/ui';
import Link from 'next/link';

export default async function TestingFeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container as='div' flex='col' width='md' center={true}>
      <Container as='div' flex='row' flexCenter={true}>
        <Link href='/testing-features/favs'>Favorites</Link>
        <Link href='/testing-features/cart'>Cart</Link>
      </Container>

      {children}
    </Container>
  );
}
