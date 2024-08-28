import { CategoryColumnInfo } from '@/shared/types/Product';

export const CategoryColumn = ({ info }: { info: CategoryColumnInfo }) => {
  return <div>{info.getValue()}</div>;
};
