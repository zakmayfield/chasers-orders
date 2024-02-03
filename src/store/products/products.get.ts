import { ProductWithUnits } from '@/types/types.product';

type GetProductsParams = {
  (): Promise<ProductWithUnits[]>;
};

export const getProducts: GetProductsParams = async () => {
  try {
    const response = await fetch('/api/products');

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
