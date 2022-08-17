import { Pipe, PipeTransform } from '@angular/core';
import { monthNames } from 'src/assets/calendarAssets';
import { IAppointment } from 'src/assets/models/appointment';

@Pipe({
  name: 'appointmentDate',
})
export class AppointmentDatePipe implements PipeTransform {
  transform(value: IAppointment): string {
    return `${value.date.getDate()} ${monthNames[value.date.getMonth()]} 
            ${value.date.getFullYear()}`;
  }
}
