import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { IAppointment } from 'src/assets/models/appointment';
import { IDay } from 'src/assets/models/day';
import { IHour } from 'src/assets/models/hour';

@Component({
  selector: 'app-hour-view',
  templateUrl: './hour-view.component.html',
  styleUrls: ['./hour-view.component.scss'],
})
export class HourViewComponent implements OnInit, OnChanges {
  @Input() weekAppointments: IAppointment[] = [];
  @Input() week: IDay[] = [];
  @Input() day = 0;
  @Input() month = 0;
  @Input() year = 0;
  @Input() numberOfAppointments = 0;
  hourlyAppointments: IAppointment[] = [];
  @Input() clickedAppointment: IHour = {} as IHour;
  hours: IHour[] = [];
  showAppointmentPopup = false;
  @Output() nextAppointmentEmitter: EventEmitter<IHour> =
    new EventEmitter<IHour>();
  @Output() prevAppointmentEmitter: EventEmitter<IHour> =
    new EventEmitter<IHour>();

  ngOnInit(): void {
    this.setHours();
  }

  ngOnChanges(): void {
    this.setHours();
  }

  public handlePopupClose(event: Event, element: HTMLDivElement): void {
    if (event.target === element) {
      this.showAppointmentPopup = false;
    }
  }

  public handleClickedDate(value: IHour): void {
    if (value.appointments.length) {
      this.clickedAppointment = value;
      this.showAppointmentPopup = true;
    }
  }

  public nextAppointmentEmitterEvent(event: IHour) {
    this.nextAppointmentEmitter.emit(event);
  }

  public prevAppointmentEmitterEvent(event: IHour) {
    this.prevAppointmentEmitter.emit(event);
  }

  private setHours(): void {
    this.hours = [];
    let tempAppointments = this.weekAppointments;
    let startHours = 8;
    let counter = 0; //for checking appointments
    while (startHours < 21) {
      let startWeekDay = 0;
      for (let i = 0; i < 8; i++) {
        if (i === 0) {
          this.hours.push({
            name: startHours.toString() + ':00',
            startHour: startHours,
            endHour: startHours + 1,
            day: -1,
            month: 0,
            year: 0,
            weekDay: 0,
            appointments: [],
          });
        } else {
          this.hours.push({
            name: '',
            startHour: startHours,
            endHour: startHours + 1,
            day: this.week[startWeekDay].day,
            month: this.week[startWeekDay].month,
            year: this.week[startWeekDay].year,
            weekDay: startWeekDay,
            appointments: [],
          });
          startWeekDay++;
        }

        tempAppointments.forEach((data: IAppointment) => {
          if (
            this.hours[counter].startHour === data.date.getHours() &&
            this.hours[counter].day === data.date.getDate()
          ) {
            this.hours[counter].appointments.push(data);
            tempAppointments = tempAppointments.filter(
              (appointmentData: IAppointment) => appointmentData.id !== data.id
            );
          }
        });
        counter++;
      }
      startHours++;
    }
  }
}
