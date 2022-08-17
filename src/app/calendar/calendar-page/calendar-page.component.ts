import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAppointments } from 'src/app/appointments/appointments-store/appointments.selectors';
import { IAppointment } from 'src/assets/models/appointment';
import { IDay } from 'src/assets/models/day';
import { selectDate } from '../calendar-store/calendar.selectors';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent {
  date$: Observable<IDay>;
  appointments$: Observable<IAppointment[]>;
  constructor(private store: Store) {
    this.date$ = this.store.select(selectDate);
    this.appointments$ = this.store.select(selectAppointments);
  }
}
