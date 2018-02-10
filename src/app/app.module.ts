import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { ListPageModule } from '../pages/list/list.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NemProvider } from '../providers/nem/nem';
import { SplitCommunicationProvider } from '../providers/split-communication/split-communication';

import { StoreModule } from '@ngrx/store';
import { reducers } from '../store/index';


@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        HomePageModule,
        ListPageModule,
        BrowserModule,
        IonicModule.forRoot(MyApp),
        StoreModule.forRoot(reducers),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        SplitCommunicationProvider,
        NemProvider
    ]
})
export class AppModule {}
