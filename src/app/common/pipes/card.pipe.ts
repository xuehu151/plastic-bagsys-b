import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'differentPipe' })
export class DifferentCardPipe implements PipeTransform {

    transform ( value: string ) {
        // let showCard = /^([1-9]{1})(\d{15}|\d{18})$/;
        // return showCard.test(value)
        let reg = /^(\d{4})\d+(\d{4})$/;
        return value.replace(reg, "$1 **** **** $2");
    }
}
