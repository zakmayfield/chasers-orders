import { NameColumnInfo } from '@/types/products';

export const NameColumn = ({ info }: { info: NameColumnInfo }) => {
  return <div>{info.getValue()}</div>;
};
