export type ActionTypes = AddAction | RemoveAction;
export type AddAction = { action: 'add'; id: string };
export type RemoveAction = { action: 'remove'; id: string };
