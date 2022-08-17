import { Pipe, PipeTransform } from '@angular/core';
import { IDay } from 'src/assets/models/day';

@Pipe({
  name: 'checkActiveWeekDay',
})
export class CheckActiveWeekDayPipe implements PipeTransform {
  transform(date: IDay, ...args: number[]): string {
    if (
      (date.day < args[2] && date.month === args[1]) ||
      date.month < args[1] ||
      date.year < args[0]
    ) {
      return 'day-names-grid__cell__item--before';
    } else if (date.day === args[2]) {
      return 'day-names-grid__cell__item--current';
    } else {
      return '';
    }
  }
}
