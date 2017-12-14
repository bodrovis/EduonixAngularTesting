import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountFormatterPipe implements PipeTransform {

  transform(value: number, discount: number, is_special?: boolean, args?: any): any {
    if(!Number.isInteger(value)) return value;

    let text = String(value);
    let discountedValue = value - discount;
    text = `You save <del>${value}</del> <b>${discountedValue}</b>`;

    return text;
  }

}
