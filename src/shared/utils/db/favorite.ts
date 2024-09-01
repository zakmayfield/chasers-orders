'use server';
import { db } from '@/lib/prisma';
import { TFavorite, TFavoriteWithProduct } from '@/shared/types/Favorite';

//^ POST
type TAddToFavorites = (props: {
  user_id: string;
  product_id: string;
}) => Promise<TFavoriteWithProduct>;
export const addToFavorites: TAddToFavorites = async ({
  user_id,
  product_id,
}) => {
  const favorite = await db.favorite.create({
    data: {
      user_id,
      product_id,
    },
    include: { product: true },
  });
  return favorite;
};

//^ DELETE
type TDeleteFromFavorites = (props: {
  user_id: string;
  product_id: string;
}) => Promise<TFavorite>;
export const deleteFromFavorites: TDeleteFromFavorites = async ({
  user_id,
  product_id,
}) => {
  const user_id_product_id = {
    user_id,
    product_id,
  };
  const favorite = await db.favorite.delete({
    where: { user_id_product_id },
  });
  return favorite;
};

//^ GET
type TGetFavoritesByUserId = (props: {
  user_id: string;
  product?: boolean;
}) => Promise<TFavoriteWithProduct[]>;
export const getFavoritesByUserId: TGetFavoritesByUserId = async ({
  user_id,
}) => {
  const favorites = await db.favorite.findMany({
    where: { user_id },
    orderBy: {
      created_at: 'desc',
    },
    include: { product: true },
  });
  return favorites;
};

type TGetFavoriteById = (props: {
  favorite_id: string;
  product?: boolean;
}) => Promise<TFavoriteWithProduct | null>;
export const getFavoriteById: TGetFavoriteById = async ({ favorite_id }) => {
  const favorite = await db.favorite.findUnique({
    where: { favorite_id },
    include: { product: true },
  });
  return favorite;
};
