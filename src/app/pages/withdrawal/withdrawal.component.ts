import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-withdrawal',
    templateUrl: './withdrawal.component.html',
    styleUrls: [ './withdrawal.component.scss' ]
})

export class WithdrawalComponent implements OnInit {
    balance: string;
    freezeBalance: string;
    amount: string;
    bankName: string;
    bankPhone: string;
    idCard: string;
    bankAccount: string;
    bankCard: string;
    submitBtn: boolean = true;

    constructor ( private activeRoute: ActivatedRoute ) {
    }

    ngOnInit (): void {
        this.activeRoute.queryParams.subscribe(params => {
            let obj = JSON.parse(params.data);
            this.balance = obj.balance;
            this.freezeBalance = obj.freezeBalance;
        })
    }

    goToWithdrawalsRecord (): void {

    }

    formChange(): void{
        if(this.amount && this.bankName &&
            this.bankPhone && this.idCard &&
            this.bankAccount && this.bankCard ){
            this.submitBtn = false;
        }
    }

    subFormInfo (): any {
        let reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^[1-9]$)|(^\d\.[1-9]{1,2}$)|(^\d\.[0]{1}[1-9]{1}$|(^\d\.[1-9]{1}[0]{1}$)$)/;
        let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        let regName =/^[\u4e00-\u9fa5]{2,4}$/;
        let bankReg = /^([1-9]{1})(\d{15}|\d{18})$/;

        if(!reg.test(this.amount)){
            alert('输入金额必须为正数!');
            return false
        }else  if ( !regName.test(this.bankName) ) {
            alert('真实姓名填写有误!');
            return false
        }
        else  if ( !telReg.test(this.bankPhone) ) {
            alert('输入合法的手机号!');
            return false
        }
        else  if ( !regIdNo.test(this.idCard) ) {
            alert('身份证号填写有误!');
            return false
        }
        else  if ( !regName.test(this.bankAccount) ) {
            alert('开户行填写有误!');
            return false
        }
        else  if ( !bankReg.test(this.bankCard) ) {
            alert('银行卡号填写有误!');
            return false
        }

        let params = {
            amount: this.amount,
            bankName: this.bankName,
            bankPhone: this.bankPhone,
            idCard: this.idCard,
            bankAccount: this.bankAccount,
            bankCard: this.bankCard
        };


    }

}
