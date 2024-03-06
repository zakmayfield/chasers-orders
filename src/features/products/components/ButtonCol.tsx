'use client';
import { FC } from 'react';
import { UnitsOnCartCacheType } from '@/features/cart/types';
import { ProductWithUnits } from '@/features/products/types';
import { getRowPayload } from '@/features/products/helpers.products';
import { Unit } from '@prisma/client';
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { CellContext } from '@tanstack/react-table';
import { BsCartPlus } from 'react-icons/bs';

export interface ButtonColProps {
  info: CellContext<ProductWithUnits, Unit[]>;
  addToCartMutation: UseMutateFunction<
    UnitsOnCartCacheType,
    unknown,
    string,
    unknown
  >;
}

export const ButtonCol: FC<ButtonColProps> = ({ info, addToCartMutation }) => {
  const queryClient = useQueryClient();

  const { rowPayload } = getRowPayload(info);
  const { defaultUnit, units, product } = rowPayload;

  const { mutate: setColumnSizeCache } = useMutation({
    mutationFn: async (value: string) => {
      queryClient.setQueryData(['size', product.id], value);
    },
  });

  const sizeCache: string | undefined = queryClient.getQueryData([
    'size',
    product.id,
  ]);

  function setToCacheAndReturnUnit(size: string) {
    setColumnSizeCache(size);
    const unit = units[0];
    return unit;
  }

  const handleAddToCart = async () => {
    if (!sizeCache) {
      const unit = setToCacheAndReturnUnit(defaultUnit.size);
      addToCartMutation(unit.id);
      return;
    }
    const unit = units.find((unit) => unit.size === sizeCache);
    addToCartMutation(unit!.id);
    return;
  };

  return (
    <div>
      <button
        className={`w-12 text-xl p-1 flex justify-center rounded text-slate-700 hover:bg-slate-50`}
        onClick={handleAddToCart}
      >
        <BsCartPlus />
      </button>
    </div>
  );
};
