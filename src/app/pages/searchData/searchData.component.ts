import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCustormClient } from '../../providers/HttpClient';
import { ServiceConfig } from "../../providers/service.config";

@Component({
    selector: 'app-searchData',
    templateUrl: './searchData.component.html',
    styleUrls: [ './searchData.component.scss' ]
})

export class SearchDataComponent implements OnInit{
    balance: string = '';
    itemData: any;

    constructor ( private http: HttpCustormClient,
                  private router: Router, ) {
    }

    ngOnInit (): void {
        this.getAgentFund();
    }

    getAgentFund(): void{
        this.http.get(ServiceConfig.AGENTFUND, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.itemData = res.data;
                this.balance = res.data.balance;
            }
            else {
                // this.errInfo = res.message;
            }
        })
    }

    goToApplyFor(): void{
        this.router.navigate([ '/withdrawal' ], {
            queryParams: {
                data: JSON.stringify(this.itemData)
            }
        });
    }

}
