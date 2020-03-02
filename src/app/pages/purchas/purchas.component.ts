import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCustormClient } from '../../providers/HttpClient';
import { ServiceConfig } from "../../providers/service.config";

@Component({
    selector: 'app-purchas',
    templateUrl: './purchas.component.html',
    styleUrls: [ './purchas.component.scss' ]
})

export class PurchasComponent implements OnInit{
    goodsList: Array<any> = [];
    count: number;
    goodId: string = '';
    consignee: string = '';
    signeeMobile: string = '';
    address: string = '';
    remark: string = '';
    payBtn: boolean = true;

    constructor (  private http: HttpCustormClient,
                   private router: Router, ) {
    }

    ngOnInit (): void {
        this.getGoodsList();
    }

    getGoodsList (): void {
        this.http.get(ServiceConfig.GOODLIST, ( res ) => {
            if ( res.code === 10000 ) {
                this.goodsList.push(...res.data);
            }
        });
    }

    changeForm(): void{
        if(this.count && this.consignee &&
            this.signeeMobile && this.address && this.goodId){
            this.payBtn = false;
        }
    }

    referTo(): any{
        if ( !this.goodId ) {
            alert('物品种类填写有误!');
            return false
        }
        else if ( !this.count ) {
            alert('物品数量填写有误!');
            return false
        }
        else if ( !this.consignee ) {
            alert('收货人填写有误!');
            return false
        }
        else if ( !this.signeeMobile ) {
            alert('收货人电话填写有误!');
            return false
        }
        else if ( !this.address ) {
            alert('收货地址填写有误!');
            return false
        }
        let params = {
            count: this.count,
            goodId: this.goodId,
            signeeMobile: this.signeeMobile,
            consignee: this.consignee,
            address: this.address,
            remark: this.remark
        };
        this.http.post(ServiceConfig.PLACEORDER, params, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                let item = {
                    sn: res.data.sn,
                    count: res.data.count,
                    price: res.data.price,
                    consignee: res.data.consignee,
                };
                this.router.navigate([ '/payment' ], {
                    queryParams: {
                        data: JSON.stringify(item)
                    }
                });
            }
            else {
                alert('提交失败!');
            }
        })
    }

    withdrawalsRecord(): void{
        this.router.navigate([ '/purchasHistory' ]);
    }

}
