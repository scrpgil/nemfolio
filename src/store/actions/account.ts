import { Action } from '@ngrx/store';

export const REGISTER = '[Account] Register';
export const DELETE = '[Account] Delete';
export const DATA_REGISTER = '[Account] DataRegister';
export const META_REGISTER = '[Account] MetaRegister';
export const TRANSACTION_ALL_REGISTER = '[Account] TransactionAllRegister';
export const HARVESTING_BLOCKS_REGISTER  = '[Account] HarvestingBlocksRegister';
 
export class Register implements Action {
    readonly type = REGISTER;
    constructor(public payload: any) {}
}
 
export class Delete implements Action {
  readonly type = DELETE;
}
 
export class DataRegister implements Action {
    readonly type = DATA_REGISTER;
    constructor(public payload: any) {}
}

export class TransactionAllRegister implements Action {
    readonly type = TRANSACTION_ALL_REGISTER;
    constructor(public payload: any) {}
}

export class HarvestingBlocksRegister implements Action {
    readonly type = HARVESTING_BLOCKS_REGISTER;
    constructor(public payload: any) {}
}
export type All
  = Register | Delete |  DataRegister | TransactionAllRegister | HarvestingBlocksRegister;
