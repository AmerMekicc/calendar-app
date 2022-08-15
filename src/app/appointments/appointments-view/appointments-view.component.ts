import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  faAngleLeft,
  faAngleRight,
  faCalendar,
  faClock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { IAppointment } from 'src/assets/models/appointment';
import { IHotel } from 'src/assets/models/hotel';
import { IHour } from 'src/assets/models/hour';

@Component({
  selector: 'app-appointments-view',
  templateUrl: './appointments-view.component.html',
  styleUrls: ['./appointments-view.component.scss'],
})
export class AppointmentsViewComponent implements OnChanges {
  leftArrow = faAngleLeft;
  rightArrow = faAngleRight;
  clockIcon = faClock;
  calendarIcon = faCalendar;
  userIcon = faUser;
  @Input() appointmentsOnCurrentDay!: IHour;
  @Input() numberOfAppointments = 0;
  hotels: Set<string> = new Set();
  appointmentsByHotel: IHotel[] = [];
  agent = 'Leroy Alvarado';
  agentType = 'Agent';

  @Output() nextAppointmentEmitter: EventEmitter<IHour> =
    new EventEmitter<IHour>();
  @Output() prevAppointmentEmitter: EventEmitter<IHour> =
    new EventEmitter<IHour>();

  ngOnChanges(): void {
    if (this.appointmentsOnCurrentDay)
      this.getHotels(this.appointmentsOnCurrentDay.appointments);
  }

  private getHotels(appointmentsOnCurrentDay: IAppointment[]): void {
    this.appointmentsByHotel = [];
    let tempAppointments = appointmentsOnCurrentDay;
    this.hotels = new Set(tempAppointments.map((item) => item.propertyName));
    this.hotels.forEach((hotel) => {
      const tempHotelAppointment = {
        name: hotel,
        address: '',
        appointments: [] as IAppointment[],
      };
      tempAppointments.forEach((appointment: IAppointment) => {
        if (appointment.propertyName === hotel) {
          if (tempHotelAppointment.address === '') {
            tempHotelAppointment.address = appointment.propertyAddress;
          }
          tempHotelAppointment.appointments.push(appointment);
          tempAppointments = tempAppointments.filter(
            (item) => item.id !== appointment.id
          );
        }
      });
      this.appointmentsByHotel.push(tempHotelAppointment);
    });
  }
  public nextAppointment(): void {
    this.nextAppointmentEmitter.emit(this.appointmentsOnCurrentDay);
  }

  public prevAppointment(): void {
    this.prevAppointmentEmitter.emit(this.appointmentsOnCurrentDay);
  }
}
