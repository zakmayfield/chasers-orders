import { ProductWithUnits } from '@/types/types.product';
import { Unit } from '@prisma/client';
import { CellContext } from '@tanstack/react-table';

type GetRowPayload = {
  (
    info: CellContext<ProductWithUnits, Unit[]>,
    selectedUnits: (Unit | null)[]
  ): {
    rowPayload: RowPayload;
  };
};

export type RowPayload = {
  rowIndex: number;
  units: Unit[];
  unit: Unit | null;
};

export const getRowPayload: GetRowPayload = (info, selectedUnits) => {
  const units = info.getValue();
  const rowIndex = info.row.index;

  const unit: Unit | null = selectedUnits[rowIndex]
    ? selectedUnits[rowIndex]
    : units[0];

  const rowPayload: RowPayload = {
    rowIndex,
    units,
    unit,
  };

  return { rowPayload };
};
