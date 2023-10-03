'use client';
import type { Product } from '@/types';
import { Unit } from '@prisma/client';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

type TableProduct = Omit<Product, 'id' | 'units'>;

export default function ProductsTable({
  products: data,
}: {
  products: Product[];
}) {
  const columnHelper = createColumnHelper<TableProduct>();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: (info) => info.getValue(),
    }),

    // units
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1>products</h1>
    </div>
  );
}
