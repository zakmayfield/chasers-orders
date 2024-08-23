import { Container } from '@/shared/components/ui';

export const CartCount = ({ count }: { count?: number }) => {
  return <Container as='span'>({count})</Container>;
};
