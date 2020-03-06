import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpCustormClient } from '../../providers/HttpClient';
import { KeepTwoDecimalService } from '../../providers/floatNumberService';

@Component({
    selector: 'app-payment-success',
    templateUrl: './payment-success.component.html',
    styleUrls: [ './payment-success.component.scss' ]
})

export class PaymentSuccessComponent implements OnInit{
    payStatus = {
        money: '',
        consignee: ''
    };

    constructor (  private activeRoute: ActivatedRoute,
                   private keepTwoDecimal: KeepTwoDecimalService,
                   private router: Router, ) {
    }

    ngOnInit (): void {
        window.history.go(0);
        this.activeRoute.queryParams.subscribe(params => {
            this.payStatus = {
                money: this.keepTwoDecimal.keepTwoDecimalFull(params.money) || '0',
                consignee: params.consignee || ''
            }
        });
    }


}
