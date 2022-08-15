import { Pipe, PipeTransform } from '@angular/core';
import { monthNames, weekDays } from 'src/assets/calendarAssets';
import { IHour } from 'src/assets/models/hour';

@Pipe({
  name: 'headerDate',
})
export class HeaderDatePipe implements PipeTransform {
  transform(value: IHour): string {
    return `${weekDays[value.weekDay]}, ${value.day} 
            ${monthNames[value.month]} ${value.year}`;
  }
}
