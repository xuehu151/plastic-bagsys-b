import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCustormClient } from '../../providers/HttpClient';
import { ServiceConfig } from "../../providers/service.config";

@Component({
    selector: 'app-purchasHistory',
    templateUrl: './purchasHistory.component.html',
    styleUrls: [ './purchasHistory.component.scss' ]
})

export class PurchasHistoryComponent implements OnInit{
    currPage: number = 1;
    pageSize: number = 100;
    totalCount: number = 0;
    totalPage: number = 0;
    withDrawHistory: Array<any> = [];
    goodsList: Array<any> = [];

    constructor (  private http: HttpCustormClient,
                   private router: Router, ) {
    }

    ngOnInit (): void {
        this.getWithDrawHistory();
        this.getGoodsList();
    }

    getWithDrawHistory(): void{
        let params = {
            currPage: this.currPage,
            pageSize: this.pageSize,
            entity: {}
        };
        this.http.post(ServiceConfig.PURCHASEHISTORY, params, ( res ) => {
            console.info(res);
            if ( res.code === 10000 ) {
                this.withDrawHistory = res.data.records;
            }
        })
    }

    getGoodsList (): void {
        this.http.get(ServiceConfig.GOODLIST, ( res ) => {
            if ( res.code === 10000 ) {
                this.goodsList.push(...res.data);
            }
        });
    }

}
