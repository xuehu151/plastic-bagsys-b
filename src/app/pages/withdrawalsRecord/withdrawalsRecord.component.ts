import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpCustormClient } from '../../providers/HttpClient';
import { ServiceConfig } from "../../providers/service.config";

@Component({
    selector: 'app-withdrawalsRecord',
    templateUrl: './withdrawalsRecord.component.html',
    styleUrls: [ './withdrawalsRecord.component.scss' ]
})
export class WithdrawalsRecordComponent implements OnInit, OnDestroy{
    currPage: number = 1;
    pageSize: number = 200;
    totalCount: number = 0;
    totalPage: number = 0;
    withDrawHistory: Array<any> = [];
    navigationSubscription: any;

    constructor ( private http: HttpCustormClient,
                  private router: Router, ) {
        this.navigationSubscription = this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.getWithDrawHistory();
            }
        });
    }

    ngOnInit (): void {
        this.getWithDrawHistory();
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    getWithDrawHistory(): void{
        let params = {
            currPage: this.currPage,
            pageSize: this.pageSize,
            entity: {
                timeSort: 2
            },
        };
        this.http.post(ServiceConfig.WITHDRAWHIS, params, ( res ) => {
            console.info(res);
            if ( res.code === 10000 ) {
                this.withDrawHistory = res.data.records;
            }
        })
    }

}
