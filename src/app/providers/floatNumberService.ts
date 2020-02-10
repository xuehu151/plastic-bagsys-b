import { Injectable } from '@angular/core';

@Injectable()
export class FloatNumberService {

    constructor () {
    }

    floatNumber ( value ) {
        let sumMoney;
        let val = value.toString().split(".");
        if ( val.length === 1 ) {
            sumMoney = value.toString() + ".0000";
        }
        if ( val.length > 1 ) {
            if ( val[ 1 ].length === 1 ) {
                sumMoney = value.toString() + "000";
            }
            else if ( val[ 1 ].length === 2 ) {
                sumMoney = value.toString() + "00";
            }
            else if ( val[ 1 ].length === 3 ) {
                sumMoney = value.toString() + "0";
            }
            else {
                sumMoney = value.toString();
            }
        }
        return sumMoney;
    }
}


@Injectable()
export class KeepTwoDecimalService {

    constructor () {
    }

    keepTwoDecimalFull ( num ) {
        let result = parseFloat(num);
        if ( isNaN(result) ) {
            return false;
        }
        result = Math.round(num * 100) / 100;
        let s_x = result.toString(); //将数字转换为字符串
        let pos_decimal = s_x.indexOf('.'); //小数点的索引值
        // 当整数时，pos_decimal=-1 自动补0
        if ( pos_decimal < 0 ) {
            pos_decimal = s_x.length;
            s_x += '.';
        }
        // 当数字的长度< 小数点索引+2时，补0
        while ( s_x.length <= pos_decimal + 2 ) {
            s_x += '0';
        }
        return s_x;
    }
}

