import { CategoryColumnInfo } from '@/types/products';

export const CategoryColumn = ({ info }: { info: CategoryColumnInfo }) => {
  return <div>{info.getValue()}</div>;
};
