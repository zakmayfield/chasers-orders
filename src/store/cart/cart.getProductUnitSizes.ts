import { Unit } from '@prisma/client';

type GetProductUnitSizesProps = {
  (unitId: string): Promise<SizesData | undefined>;
};

export type SizesData = {
  id: string;
  product: {
    id: string;
    units: Unit[];
  };
};

export const getProductUnitSizes: GetProductUnitSizesProps = async (unitId) => {
  try {
    const response = await fetch(`/api/cart/unit-sizes?unitId=${unitId}`);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
