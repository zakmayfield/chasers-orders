'use client';
import { Container, ContentTemplate } from '@/shared/components/ui';
import { FavoritesList } from '../organisms/FavoritesList';

export const FavoritesTemplate = () => {
  return (
    <ContentTemplate title='Favorites' headingClassname='mb-3'>
      <Container as='div' flex='col' paddingX='lg'>
        <FavoritesList />
      </Container>
    </ContentTemplate>
  );
};
