import { TableConfigParams } from '@/types/products';

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

const FirstPage = ({ tableConfig }: TableConfigParams) => {
  return (
    <PagButton
      handleClick={() => tableConfig.setPageIndex(0)}
      isDisabled={!tableConfig.getCanPreviousPage()}
      content='<<'
    />
  );
};
const PreviousPage = ({ tableConfig }: TableConfigParams) => {
  return (
    <PagButton
      handleClick={() => tableConfig.previousPage()}
      isDisabled={!tableConfig.getCanPreviousPage()}
      content='<'
    />
  );
};
const NextPage = ({ tableConfig }: TableConfigParams) => {
  return (
    <PagButton
      handleClick={() => tableConfig.nextPage()}
      isDisabled={!tableConfig.getCanNextPage()}
      content='>'
    />
  );
};
const LastPage = ({ tableConfig }: TableConfigParams) => {
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

export const PaginationButtonGroup = ({ tableConfig }: TableConfigParams) => {
  return (
    <div>
      <FirstPage tableConfig={tableConfig} />
      <PreviousPage tableConfig={tableConfig} />
      <NextPage tableConfig={tableConfig} />
      <LastPage tableConfig={tableConfig} />
    </div>
  );
};
