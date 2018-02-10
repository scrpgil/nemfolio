import { Component } from '@angular/core';
import { IonicPage, AlertController, MenuController, NavController, NavParams } from 'ionic-angular';
import {SplitCommunicationProvider} from "../../providers/split-communication/split-communication";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Address from '../../store/actions/address';
import * as Account from '../../store/actions/account';

@IonicPage({
    name:'list',
    segment:'list'
})
@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    address$:Observable<any>;
    address:any = null;
    first:boolean = false;

    constructor(
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public menu:MenuController,
        public navParams: NavParams,
        public store: Store<any>,
        public splitCommunication:SplitCommunicationProvider
    ) {
    }
    ionViewDidEnter(){
        this.address$ = this.store.select('address');
        this.address$.subscribe(ad =>{
            console.log(ad);
            if(ad){
                this.address = ad;
                if(this.address.current.address == ''){
                    if(!this.first){
                        this.first = true;
                        this.addAddress();
                    }
                }else{
                    this.first = true;
                }
            }
        });
    }

    setRootPage(name){
        this.menu.close();
        this.splitCommunication.setRootPage(name);
    }
    setCurrentAddreess(l){
        if(l.address != this.address.current.address){
            this.address.current = l;
            this.store.dispatch(new Account.Delete());
            this.store.dispatch(new Address.Current(this.address.current));
        }
        this.splitCommunication.setRootPage('home');
    }
    delAddress(l, idx){
        let confirm = this.alertCtrl.create({
            title: '削除',
            message: 'アドレスを削除しますか？',
            buttons: [
                {
                    text: 'キャンセル',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '削除する',
                    handler: () => {
                        if(this.address.lists.length > 1){
                            if(this.address.lists[idx].address == this.address.current.address){
                                this.store.dispatch(new Account.Delete());
                            }
                            this.store.dispatch(new Address.DeleteByIndex(idx));
                        }else if(this.address.lists.length <= 1){
                            this.store.dispatch(new Account.Delete());
                            this.store.dispatch(new Address.Delete());
                        }
                        this.splitCommunication.setRootPage('home');
                    }
                }
            ]
        });
        confirm.present();
    }
    addAddress(){
        let prompt = this.alertCtrl.create({
            title: 'アドレスを追加',
            message: "アドレスを入力してください",
            inputs: [
                {
                    name: 'address',
                    placeholder: '例)NCJY2N-556CQS...',
                    type: 'text'
                }
            ],
            buttons: [
                {
                    text: 'キャンセル',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '追加',
                    handler: data => {
                        console.log(data);
                        if(data){
                            if(data.address){
                                let d = data.address.replace(/-/g, '');
                                if(d != this.address.current.address){
                                    this.store.dispatch(new Account.Delete());
                                    this.store.dispatch(new Address.Add(d));
                                    this.splitCommunication.setRootPage('home');
                                }
                            }
                        }
                    }
                }
            ]
        });
        prompt.present();
    }
}
