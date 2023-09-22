type Unit = {
  id: string;
  unit: string;
  price: number;
  code: string;
  productId: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  units: Unit[];
};

export const getProducts = async (): Promise<Product[]> => {
  const dataList: Product[] = await fetch('/api/products').then((res) =>
    res.json()
  );
  console.log(dataList);
  return dataList;
};
