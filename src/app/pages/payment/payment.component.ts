import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpCustormClient } from '../../providers/HttpClient';
import { ServiceConfig } from "../../providers/service.config";
import { KeepTwoDecimalService } from '../../providers/floatNumberService';
declare let WeixinJSBridge: any;

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: [ './payment.component.scss' ]
})

export class PaymentComponent implements OnInit {
    sn: string;
    totalMoney: any;
    consignee: any;

    constructor ( private http: HttpCustormClient,
                  private activeRoute: ActivatedRoute,
                  private keepTwoDecimal: KeepTwoDecimalService,
                  private router: Router, ) {
    }

    ngOnInit (): void {
        this.activeRoute.queryParams.subscribe(params => {
            let obj = JSON.parse(params.data);
            this.consignee = obj.consignee;
            this.sn = obj.sn;
            this.totalMoney = this.keepTwoDecimal.keepTwoDecimalFull(obj.count * obj.price);
        });
    }

    payMent (): void {
        let params = {
            orderSn: this.sn,
        };
        this.http.post(ServiceConfig.PAUMENT, params, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                // this.router.navigate([ '/purchasHistory' ]);
                this.onBridgeReady(res.data.appId, res.data.nonceStr, res.data.packageValue, res.data.paySign, res.data.timeStamp);
            }
            else {
                alert(res.message);
            }
        })
    }

    onBridgeReady ( appId, nonceStr, packageValue, paySign, timeStamp ) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": appId,
                "nonceStr": nonceStr,
                "package": packageValue,
                "paySign": paySign,
                "signType": 'MD5',
                "timeStamp": timeStamp
            },
            function ( res ) {
                if ( res.err_msg == "get_brand_wcpay_request:ok" ) {
                    this.router.navigate([ '/payment-success' ], {
                        queryParams: {
                            money: this.totalMoney,
                            consignee: this.consignee
                        }
                    });
                }
                else if ( res.err_msg == "get_brand_wcpay_request:cancel" ) {
                    alert("用户取消支付");
                }
                else if ( res.err_msg == "get_brand_wcpay_request:fail" ) {
                    alert("支付失败");
                }
            }
        );
    }

}
