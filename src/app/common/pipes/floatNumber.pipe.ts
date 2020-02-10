import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'floatNumberPipe' })
export class FloatNumberPipe implements PipeTransform {

    transform ( value: string ) {
        let sumMoney;
        let val = value.toString().split(".");
        if ( val.length === 1 ) {
            sumMoney = value ? value.toString() + ".00" : '0.00';
        }
        if ( val.length > 1 ) {
            if ( val[ 1 ].length === 1 ) {
                sumMoney = value.toString() + "0";
            }
            else {
                sumMoney = value.toString();
            }
        }
        return sumMoney;
    }
}
