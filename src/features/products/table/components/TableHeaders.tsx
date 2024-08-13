import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { ProductWithUnits } from '@/types/products';

export const TableHeaders = ({
  group,
}: {
  group: HeaderGroup<ProductWithUnits>;
}) => {
  return (
    <tr>
      {group.headers.map((header) => (
        <th key={header.id}>
          {header.isPlaceholder ? null : (
            <div>
              {/* Column Header Title */}
              {flexRender(header.column.columnDef.header, header.getContext())}

              {/* Filter */}
            </div>
          )}
        </th>
      ))}
    </tr>
  );
};
