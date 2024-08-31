'use server';
import { db } from '@/lib/prisma';
import { TFavorite, TFavoriteWithProduct } from '@/shared/types/Favorite';

//^ POST
type TAddToFavorites = (props: {
  user_id: string;
  product_id: string;
}) => Promise<TFavorite>;
export const addToFavorites: TAddToFavorites = async ({
  user_id,
  product_id,
}) => {
  const favorite = await db.favorite.create({
    data: {
      user_id,
      product_id,
    },
  });
  return favorite;
};

//^ DELETE
type TDeleteFromFavorites = (props: {
  favorite_id: string;
}) => Promise<TFavorite>;
export const deleteFromFavorites: TDeleteFromFavorites = async ({
  favorite_id,
}) => {
  const favorite = await db.favorite.delete({
    where: { favorite_id },
  });
  return favorite;
};

//^ MISC
type TToggleFavorite = (props: {
  isFavorited: boolean;
  user_id?: string;
  product_id?: string;
  favorite_id?: string;
}) => Promise<TFavorite>;
export const toggleFavorite: TToggleFavorite = async ({
  isFavorited,
  user_id,
  product_id,
  favorite_id,
}) => {
  if (isFavorited) {
    const del = await deleteFromFavorites({ favorite_id: favorite_id! });
    return del;
  } else {
    const add = await addToFavorites({
      user_id: user_id!,
      product_id: product_id!,
    });
    return add;
  }
};

//^ GET
type TGetFavoritesByUserId = (props: {
  user_id: string;
  product?: boolean;
}) => Promise<TFavorite[] | TFavoriteWithProduct[]>;
export const getFavoritesByUserId: TGetFavoritesByUserId = async ({
  user_id,
  product,
}) => {
  const favorites = await db.favorite.findMany({
    where: { user_id },
    orderBy: {
      created_at: 'desc',
    },
    include: { product },
  });
  return favorites;
};

type TGetFavoriteById = (props: {
  favorite_id: string;
  product?: boolean;
}) => Promise<TFavorite | TFavoriteWithProduct | null>;
export const getFavoriteById: TGetFavoriteById = async ({
  favorite_id,
  product,
}) => {
  const favorite = await db.favorite.findUnique({
    where: { favorite_id },
    include: { product },
  });
  return favorite;
};
