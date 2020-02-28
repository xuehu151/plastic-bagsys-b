import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCustormClient } from '../../providers/HttpClient';
import { ServiceConfig } from "../../providers/service.config";

@Component({
    selector: 'app-withdrawalsRecord',
    templateUrl: './withdrawalsRecord.component.html',
    styleUrls: [ './withdrawalsRecord.component.scss' ]
})
export class WithdrawalsRecordComponent implements OnInit{
    currPage: number = 1;
    pageSize: number = 15;
    totalCount: number = 0;
    totalPage: number = 0;
    withDrawHistory: Array<any> = [];

    constructor ( private http: HttpCustormClient,
                  private router: Router, ) {
    }

    ngOnInit (): void {
        this.getWithDrawHistory();
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
