import { Table as ReactTable, Column } from '@tanstack/react-table';
import { ProductWithUnits } from '@/types/products';
import { categoryData as categories } from '@/features/products/helpers.products';

export const Filter = ({
  reactTable,
  column,
}: {
  reactTable: ReactTable<ProductWithUnits>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, any>;
}) => {
  const firstValue = reactTable
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return firstValue === 'BLENDS' ? (
    <div className='w-full'>
      <select
        name='category'
        id='category'
        className='font-normal rounded border py-1'
        onChange={(e) => column.setFilterValue(e.target.value)}
        value={(columnFilterValue ?? '') as string}
      >
        <option value=''>SHOW ALL</option>
        {categories.map((cat) => {
          const formattedCat = cat.toUpperCase();
          return (
            <option key={cat} value={formattedCat}>
              {formattedCat}
            </option>
          );
        })}
      </select>
    </div>
  ) : (
    <div className='w-full'>
      <input
        type='text'
        value={(columnFilterValue ?? '') as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Search...`}
        className='border rounded font-normal w-3/4 py-1 pl-1'
      />
    </div>
  );
};
