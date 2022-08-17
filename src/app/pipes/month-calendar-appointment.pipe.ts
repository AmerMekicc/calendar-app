import { Pipe, PipeTransform } from '@angular/core';
import { IAppointment } from 'src/assets/models/appointment';
import { IDay } from 'src/assets/models/day';

@Pipe({
  name: 'monthCalendarAppointment',
})
export class MonthCalendarAppointmentPipe implements PipeTransform {
  transform(value: IDay, ...args: Array<IAppointment>[]): string {
    let classString = '';
    const currentDate = new Date();
    args[0].find((appointment: IAppointment) => {
      if (
        appointment.date.getDate() === value.day &&
        appointment.date.getMonth() === value.month &&
        appointment.date.getFullYear() === value.year
      ) {
        if (
          appointment.date.getDate() < currentDate.getDate() ||
          appointment.date.getMonth() < currentDate.getMonth() ||
          appointment.date.getFullYear() < currentDate.getFullYear()
        ) {
          classString = 'not-active-appointment';
        } else {
          classString = 'active-appointment';
        }
      }
    });

    return classString;
  }
}
