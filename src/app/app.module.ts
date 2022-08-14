import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MonthCalendarComponent } from './calendar/month-calendar/month-calendar.component';
import { calendarReducer } from './calendar/calendar-store/calendar.reducers';
import { CalendarPageComponent } from './calendar/calendar-page/calendar-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeekCalendarComponent } from './calendar/week-calendar/week-calendar.component';
import { appointmentsReducer } from './appointments/appointments-store/appointments.reducers';
import { AppointmentEffects } from './appointments/appointments-store/appointments.effects';
import { HourViewComponent } from './calendar/week-calendar/hour-view/hour-view.component';
import { AppointmentsViewComponent } from './appointments/appointments-view/appointments-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthCalendarComponent,
    CalendarPageComponent,
    WeekCalendarComponent,
    HourViewComponent,
    AppointmentsViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        calendarState: calendarReducer,
        appointmentsState: appointmentsReducer,
      },
      {}
    ),
    EffectsModule.forRoot([AppointmentEffects]),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
