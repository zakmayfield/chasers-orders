import { Container, Heading } from '@/shared/components/ui';
import Link from 'next/link';

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container as='div' flex='col' center={true}>
      <Heading as='h1' content='Testing Features' />
    </Container>
  );
}
