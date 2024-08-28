'use client';
import { TableConfig } from '@/shared/types/Product';
import { ReactNode, createContext, useContext } from 'react';

type TableContextType = {
  tableConfig: TableConfig;
};

const TableContext = createContext<TableContextType | null>(null);

export const useTableContext = () =>
  useContext(TableContext) as TableContextType;

export const TableProvider = ({
  tableConfig,
  children,
}: {
  tableConfig: TableConfig;
  children: ReactNode;
}) => {
  return (
    <TableContext.Provider value={{ tableConfig }}>
      {children}
    </TableContext.Provider>
  );
};
