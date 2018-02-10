import * as AddressActions from '../actions/address'

export type Action = AddressActions.All;

export interface Address {
  current: AddressObj;
  lists: AddressObj[];
}
 
export interface AddressObj {
    address:string;
}

export function reducer(address:Address = {current:{address:""},lists:[]}, action: Action) {
    switch (action.type) {
        case AddressActions.RESTORE:{
            let a = localStorage.getItem("address");
            let n = address;
            if(a){
                let restore = JSON.parse(a);
                if("current" in restore){
                    n = restore;
                }
            }
            console.log(n);
            return n;
        }
        case AddressActions.CURRENT:{
            let n = {current:action.payload, lists:address.lists};
            localStorage.setItem("address", JSON.stringify(n));
            return n;
        }
        case AddressActions.ADD:{
            let ad = action.payload;
            let dupli = false;
            for(let i=0;i<address.lists.length;i++){
                if(address.lists[i].address == ad){
                    address.current = address.lists[i];
                    dupli = true;
                }
            }
            let n = {current:address.current, lists:address.lists};
            if(!dupli){
                n = {current:address.current, lists:[...address.lists, {address:ad}]};
                console.log(n);
                n.current = n.lists[n.lists.length - 1];
            }
            localStorage.setItem("address", JSON.stringify(n));
            return n;
        }
        case AddressActions.DELETE_BY_INDEX:{
            let idx = action.payload;
            let cur = false;
            if(address.lists[idx].address == address.current.address){
                cur = true;
            }
            address.lists.splice(idx,1);
            if(cur){
                idx = idx - 1;
                if(idx < 0){
                    idx = 0;
                }
                address.current = address.lists[idx]
            }
            localStorage.setItem("address", JSON.stringify(address));
            return {current:address.current, lists:address.lists};
        }
        case AddressActions.DELETE:{
            localStorage.removeItem("address");
            return {current:{address:""},lists:[]};
        }
        default:
            return address;
    };
};

export const getAddressCurrent = (address: Address) => address.current;
export const getAddressLists = (address: Address) => address.lists;
