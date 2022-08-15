import { Pipe, PipeTransform } from '@angular/core';
import { IDay } from 'src/assets/models/day';

@Pipe({
  name: 'checkActiveDayMonth',
})
export class CheckActiveDayMonthPipe implements PipeTransform {
  transform(date: IDay, ...args: number[]): string {
    if (date.month !== args[0]) {
      return 'days-number-grid__cell__item--not-current-month';
    } else if (date.day === args[1]) {
      return 'days-number-grid__cell__item--current-day';
    } else {
      return '';
    }
  }
}
