import { Action } from '@ngrx/store';

export const RESTORE = '[Address] Restore';
export const DELETE = '[Address] Delete';
export const DELETE_BY_INDEX = '[Address] DeleteByIndex';
export const CURRENT = '[Address] Current';
export const ADD = '[Address] Add';
 
export class Restore implements Action {
    readonly type = RESTORE;
}
 
export class DeleteByIndex implements Action {
    readonly type = DELETE_BY_INDEX;
    constructor(public payload: number) {}
}

export class Delete implements Action {
    readonly type = DELETE;
}

export class Current implements Action {
    readonly type = CURRENT;
    constructor(public payload: any) {}
}
 
export class Add implements Action {
    readonly type = ADD;
    constructor(public payload: any) {}
}


export type All
= Restore
| DeleteByIndex
| Delete
| Current
| Add;
