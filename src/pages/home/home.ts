import { ViewChild, Component } from '@angular/core';
import { Events, IonicPage,NavController } from 'ionic-angular';
import { NemProvider } from '../../providers/nem/nem';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';

import { Account } from '../../store/reducers/account';

@IonicPage({
    name:'home',
    segment:'home'
})
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [NemProvider],
})
export class HomePage {
    @ViewChild('barCanvas') barCanvas;
    barChart: any;
    account$:Observable<any>;
    account:Account;
    values: any = [];
    labels: any = [];
    rgb: any = {
        "high":'rgba(244,72,79,1)',
        "mid":'rgba(0,188,170,1)',
        "low":'rgba(152,187,204,1)'
    };
    colors: any = [];
    refresher:any = null;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public nem: NemProvider,
        public store: Store<any>
    ) {
        this.account$ = this.store.select('account');
    }
    ionViewDidEnter(){
        this.account$.subscribe(data =>{
            this.account = data;
            console.log(this.account);
            if(data.data && data.transaction_all && data.harvesting_blocks){
                this.values = [];
                this.labels = [];
                for(let i=0;i<data.harvesting_blocks.data.length;i++){
                    if(i >= 25){
                        break;
                    }
                    //let val = nemSdk.utils.format.nemValue(data.harvesting_blocks.data[i].totalFee);
                    let val = data.harvesting_blocks.data[i].totalFee / 1000000;
                    this.values.push(val);
                    this.labels.push(data.harvesting_blocks.data[i].id);
                    if(val <= 9){
                        this.colors.push(this.rgb["low"]);
                    }else if(10 <= val && val <= 29){
                        this.colors.push(this.rgb["mid"]);
                    }else if(30 <= val){
                        this.colors.push(this.rgb["high"]);
                    }
                }
                this.setBarChart();
            }
            if(this.refresher){
                this.refresher.complete();
            }
        });
    }

    setBarChart(){
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: [{
                    label: '',
                    data: this.values,
                    backgroundColor: this.colors,
                    borderColor: this.colors,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            stepSize:10,
                            beginAtZero:true
                        }
                    }]
                }
            }

        });
        this.barChart.render();
    }
    doRefresh(refresher) {
        this.events.publish('store:refresh');
        this.refresher = refresher;
    }
}
