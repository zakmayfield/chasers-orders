'use client';
import { useTableContext } from '@/lib/providers/TableProvider';

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

const FirstPage = () => {
  const { tableConfig } = useTableContext();

  return (
    <PagButton
      handleClick={() => tableConfig.setPageIndex(0)}
      isDisabled={!tableConfig.getCanPreviousPage()}
      content='<<'
    />
  );
};
const PreviousPage = () => {
  const { tableConfig } = useTableContext();

  return (
    <PagButton
      handleClick={() => tableConfig.previousPage()}
      isDisabled={!tableConfig.getCanPreviousPage()}
      content='<'
    />
  );
};
const NextPage = () => {
  const { tableConfig } = useTableContext();

  return (
    <PagButton
      handleClick={() => tableConfig.nextPage()}
      isDisabled={!tableConfig.getCanNextPage()}
      content='>'
    />
  );
};
const LastPage = () => {
  const { tableConfig } = useTableContext();

  return (
    <PagButton
      handleClick={() =>
        tableConfig.setPageIndex(tableConfig.getPageCount() - 1)
      }
      isDisabled={!tableConfig.getCanNextPage()}
      content='>>'
    />
  );
};

export const PaginationButtonGroup = () => {
  return (
    <div className='flex gap-1'>
      <FirstPage />
      <PreviousPage />
      <NextPage />
      <LastPage />
    </div>
  );
};
