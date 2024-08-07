import { Product, Unit } from '@prisma/client';

export type ProductWithUnits = Product & {
  units: Unit[];
};

export type Actions = 'add' | 'remove';
export type ActionTypes = AddAction | RemoveAction;
type AddAction = { action: 'add'; id: string };
type RemoveAction = { action: 'remove'; id: string };
