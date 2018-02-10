import * as AccountActions from '../actions/account'

export type Action = AccountActions.All;

export interface Account {
  data: {};
  meta: {};
  transaction_all: {};
  harvesting_blocks: {};
}
 
export function reducer(account:Account = {data:null, meta:null, transaction_all:null, harvesting_blocks:null}, action: Action) {
    switch (action.type) {
        case AccountActions.REGISTER:
            return action.payload;
        case AccountActions.DELETE:
            return {data:null, meta:null, transaction_all:null, harvesting_blocks:null};
        case AccountActions.DATA_REGISTER:
            return {data: action.payload, meta:account.meta, transaction_all:account.transaction_all, harvesting_blocks:account.harvesting_blocks};
        case AccountActions.TRANSACTION_ALL_REGISTER:
            return {data:account.data, meta:account.meta, transaction_all: action.payload, harvesting_blocks:account.harvesting_blocks};
        case AccountActions.HARVESTING_BLOCKS_REGISTER:
            return {data:account.data, meta:account.meta, transaction_all: account.transaction_all, harvesting_blocks:action.payload};
        default:
            return account;
    };
};

export const getAccountData = (account: Account) => account.data;
export const getAccountTransactionAll = (account: Account) => account.transaction_all;
export const getAccountHarvestingBlocks = (account: Account) => account.harvesting_blocks;
