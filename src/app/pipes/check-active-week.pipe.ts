import { Pipe, PipeTransform } from '@angular/core';
import { getWeek } from 'date-fns';
import { IDay } from 'src/assets/models/day';

@Pipe({
  name: 'checkActiveWeek',
})
export class CheckActiveWeekPipe implements PipeTransform {
  transform(date: IDay, ...args: number[]): string {
    const currentDayWeek = getWeek(new Date(args[0], args[1], args[2]));
    const checkedDayWeek = getWeek(new Date(date.year, date.month, date.day));
    if (currentDayWeek === checkedDayWeek) {
      return 'days-number-grid__cell--active-week';
    } else {
      return '';
    }
  }
}
