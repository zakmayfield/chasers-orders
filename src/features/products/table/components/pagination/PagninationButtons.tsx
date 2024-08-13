import { Table } from '@tanstack/react-table';
import { ProductWithUnits } from '@/types/products';

type PaginationButtonProps = {
  tableConfig: Table<ProductWithUnits>;
};

const PagButton = ({
  handleClick,
  isDisabled,
  content,
}: {
  handleClick(): void;
  isDisabled: boolean;
  content: string;
}) => {
  return (
    <button
      className={`border rounded p-1 ${
        isDisabled ? 'opacity-50' : 'opacity-100 cursor-pointer'
      }`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {content}
    </button>
  );
};

const FirstPage = ({ tableConfig }: PaginationButtonProps) => {
  return (
    <PagButton
      handleClick={() => tableConfig.setPageIndex(0)}
      isDisabled={!tableConfig.getCanPreviousPage()}
      content='<<'
    />
  );
};
const PreviousPage = ({ tableConfig }: PaginationButtonProps) => {
  return (
    <PagButton
      handleClick={() => tableConfig.previousPage()}
      isDisabled={!tableConfig.getCanPreviousPage()}
      content='<'
    />
  );
};
const NextPage = ({ tableConfig }: PaginationButtonProps) => {
  return (
    <PagButton
      handleClick={() => tableConfig.nextPage()}
      isDisabled={!tableConfig.getCanNextPage()}
      content='>'
    />
  );
};
const LastPage = ({ tableConfig }: PaginationButtonProps) => {
  return (
    <PagButton
      handleClick={() => tableConfig.getPageCount() - 1}
      isDisabled={!tableConfig.getCanNextPage()}
      content='>>'
    />
  );
};

export const PaginationButtonGroup = ({
  tableConfig,
}: PaginationButtonProps) => {
  return (
    <div>
      <FirstPage tableConfig={tableConfig} />
      <PreviousPage tableConfig={tableConfig} />
      <NextPage tableConfig={tableConfig} />
      <LastPage tableConfig={tableConfig} />
    </div>
  );
};
