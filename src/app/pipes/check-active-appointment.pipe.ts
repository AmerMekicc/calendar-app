import { Pipe, PipeTransform } from '@angular/core';
import { IAppointment } from 'src/assets/models/appointment';
import { IHour } from 'src/assets/models/hour';

@Pipe({
  name: 'checkActiveAppointment',
})
export class CheckActiveAppointmentPipe implements PipeTransform {
  transform(date: IHour, ...args: Array<IAppointment>[]): string {
    const valueDate = new Date(date.year, date.month, date.day);
    const currentDate = new Date();
    if (valueDate.getTime() < currentDate.getTime() && args[0].length) {
      return 'grid-cells--not-active';
    } else if (args[0].length) {
      return 'grid-cells--active';
    } else {
      return '';
    }
  }
}
