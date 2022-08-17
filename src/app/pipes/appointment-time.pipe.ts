import { Pipe, PipeTransform } from '@angular/core';
import { IAppointment } from 'src/assets/models/appointment';

@Pipe({
  name: 'appointmentTime',
})
export class AppointmentTimePipe implements PipeTransform {
  transform(value: IAppointment): string {
    const tempMinute =
      value.date.getMinutes() === 0 ? '00' : value.date.getMinutes();
    return `${value.date.getHours()}:${tempMinute}`;
  }
}
