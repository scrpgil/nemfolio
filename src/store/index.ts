import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
 
import * as fromAccount from './reducers/account';
import * as fromAddress from './reducers/address';
 
export const reducers: ActionReducerMap<any> = {
  account: fromAccount.reducer,
  address: fromAddress.reducer
};

export const getAccount = createFeatureSelector<fromAccount.Account>('account');
export const getAccountData = createSelector(getAccount, fromAccount.getAccountData);
export const getAccountTransactionAll = createSelector(getAccount, fromAccount.getAccountTransactionAll);
export const getAccountHarvestingBlocks = createSelector(getAccount, fromAccount.getAccountHarvestingBlocks);

export const getAddress = createFeatureSelector<fromAddress.Address>('address');
export const getAddressCurrent = createSelector(getAddress, fromAddress.getAddressCurrent);
export const getAddressLists = createSelector(getAddress, fromAddress.getAddressLists);
