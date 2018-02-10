import { Component, ViewChild } from '@angular/core';
import { Events, Nav, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Account from '../store/actions/account';
import * as Address from '../store/actions/address';
import * as fromRoot from '../store/index';
import {SplitCommunicationProvider} from "../providers/split-communication/split-communication";
import {Subscription} from "rxjs/subscription";

import { NemProvider } from '../providers/nem/nem';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    @ViewChild("content") contentCtrl: NavController;

    rootPage: any = 'home';
    listPage: any = 'list';


    rootSubjectSubscription: Subscription;

    address$:Observable<any>;
    current:any = null;

    constructor(
        public nem: NemProvider,
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public events: Events,
        public store: Store<any>,
        public splitCommunication:SplitCommunicationProvider
    ) {
        this.initApp();
        this.initStoreData();
        this.rootSubjectSubscription = this.splitCommunication.rootSubject$.subscribe((path) => {
            switch (path) {
                case 'home':
                    this.contentCtrl.setRoot('home');
                break;
                default:
                    console.log("default");
                break;
            }
        });

    }

    initApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
    initStoreData() {
        this.store.dispatch(new Address.Restore());
        this.address$ = this.store.select(fromRoot.getAddressCurrent);
        this.address$.subscribe(ad =>{
            this.current = ad;
            this.getStore(this.current);
        });
        this.events.subscribe('store:refresh', () => {
            this.getStore(this.current);
        });
    }
    getStore(current){
        if(current){
            if(current.address != ""){
                this.nem.getAccountData(current.address).subscribe(data=>{
                    console.log(data);
                    this.store.dispatch(new Account.DataRegister(data));
                },
                err => {
                    console.log("failed");
                });
                this.nem.getAccountTransactionAll(current.address).subscribe(data=>{
                    console.log(data);
                    this.store.dispatch(new Account.TransactionAllRegister(data));
                },
                err => {
                    console.log("failed");
                });
                this.nem.getAccountHarvestingBlocks(current.address).subscribe(data=>{
                    console.log(data);
                    this.store.dispatch(new Account.HarvestingBlocksRegister(data));
                },
                err => {
                    console.log("failed");
                });
            }
        }
    }
}
