import { CellContext } from '@tanstack/react-table';
import { ProductWithUnits } from '@/features/products/types';

type CategoryColProps = {
  info: CellContext<ProductWithUnits, string>;
};

export const CategoryCol: React.FC<CategoryColProps> = ({ info }) => {
  const cellContent = info.getValue();
  return <div>{cellContent}</div>;
};
