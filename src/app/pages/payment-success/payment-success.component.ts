import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
                   private zone:NgZone,
                   private keepTwoDecimal: KeepTwoDecimalService,
                   private router: Router, ) {
        this.zone.run(() => { });
    }

    ngOnInit (): void {
        this.activeRoute.queryParams.subscribe(params => {
            this.payStatus = {
                money: this.keepTwoDecimal.keepTwoDecimalFull(params.money) || '0',
                consignee: params.consignee || ''
            }
        });
    }


    gohome():void{
        sessionStorage.setItem('sign', 'true');
        this.router.navigate([ '/home' ]);
    }

}
