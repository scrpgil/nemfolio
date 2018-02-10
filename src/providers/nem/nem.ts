import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';
import nem from "nem-sdk";

@Injectable()
export class NemProvider {
    endpoint:any;
    constructor() {
        //this.endpoint = nem.model.objects.create("endpoint")("https://shibuya.supernode.me:7891http://alice2.nem.ninja", nem.model.nodes.defaultPort);
        // httpsのノードは数少ない・・・
        //this.endpoint = nem.model.objects.create("endpoint")("https://shibuya.supernode.me", 7891);
        this.endpoint = nem.model.objects.create("endpoint")("https://transfer.nemfolio.net", 443);
        //this.endpoint = nem.model.objects.create("endpoint")("http://localhost", 8080);
        console.log('Hello NemProvider Provider');
    }

    getAccountData(address): Observable<any>{
        let promise =  nem.com.requests.account.data(this.endpoint, address);
        return Observable.fromPromise(promise);
    }
    getAccountTransactionAll(address): Observable<any>{
        let promise = nem.com.requests.account.transactions.all(this.endpoint, address);
        return Observable.fromPromise(promise);
    }
    getAccountHarvestingBlocks(address): Observable<any>{
        let promise = nem.com.requests.account.harvesting.blocks(this.endpoint, address);
        return Observable.fromPromise(promise);
    }
}
