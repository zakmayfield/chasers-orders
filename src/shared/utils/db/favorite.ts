'use server';
import { db } from '@/lib/prisma';
import { TFavorite, TFavoriteWithProduct } from '@/shared/types/Favorite';

type TGetFavoritesByUserId = (props: {
  user_id: string;
}) => Promise<TFavorite[]>;

export const getFavoritesByUserId: TGetFavoritesByUserId = async ({
  user_id,
}) => {
  const favorites = await db.favorite.findMany({ where: { user_id } });
  return favorites;
};

type TGetFavoriteById = (props: {
  favorite_id: string;
}) => Promise<TFavorite | null>;

export const getFavoriteById: TGetFavoriteById = async ({ favorite_id }) => {
  const favorite = await db.favorite.findUnique({ where: { favorite_id } });
  return favorite;
};

type TGetFavoriteWithProductById = (props: {
  favorite_id: string;
}) => Promise<TFavoriteWithProduct | null>;

export const getFavoriteWithProductById: TGetFavoriteWithProductById = async ({
  favorite_id,
}) => {
  const favorite = await db.favorite.findUnique({
    where: { favorite_id },
    include: {
      product: true,
    },
  });
  return favorite;
};

type TGetFavoritesWithProductByUserId = (props: {
  user_id: string;
}) => Promise<TFavoriteWithProduct[] | null>;

export const getFavoritesWithProductByUserId: TGetFavoritesWithProductByUserId =
  async ({ user_id }) => {
    const favorite = await db.favorite.findMany({
      where: { user_id },
      include: {
        product: true,
      },
    });
    return favorite;
  };
