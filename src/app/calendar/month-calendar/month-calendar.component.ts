import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { getDay, getDaysInMonth } from 'date-fns';
import {
  getNextMonth,
  getPrevMonth,
  weekDays,
  monthNames,
} from 'src/assets/calendarAssets';
import { IAppointment } from 'src/assets/models/appointment';
import { IDay } from 'src/assets/models/day';
import { setDate } from '../calendar-store/calendar.actions';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
})
export class MonthCalendarComponent implements OnInit, OnChanges {
  arrowLeftIcon = faAngleLeft;
  arrowRightIcon = faAngleRight;
  @Input() day = 0;
  @Input() month = 0;
  @Input() year = 0;
  @Input() appointments: IAppointment[] = [];
  weekDayNames = weekDays;
  daysInMonth: IDay[] = [];
  monthNames = monthNames;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.populateDays();
  }

  ngOnChanges(): void {
    this.populateDays();
  }
  private populateDays(): void {
    this.daysInMonth = [];
    const prevMonthDate = getPrevMonth(new Date(this.year, this.month));
    const nextMonthDate = getNextMonth(new Date(this.year, this.month));
    const prevMonthDays = getDaysInMonth(prevMonthDate);
    const currentMonthDays = getDaysInMonth(new Date(this.year, this.month));
    const weekDayOfFirstDay = getDay(new Date(this.year, this.month, 1));
    const weekDayOfLastDay = getDay(
      new Date(
        this.year,
        this.month,
        getDaysInMonth(new Date(this.year, this.month))
      )
    );
    /*calculating the remaining days of previous month 
    that fit into the first week of current month*/
    let prevMonthRemainingDays = prevMonthDays - (weekDayOfFirstDay - 1);

    /*calculating the remaining days of next month
    that fit into the last week of current month*/
    const nextMonthRemainingDays = 7 - weekDayOfLastDay;

    /*Populating daysInMonth with prev month remaining days*/
    while (prevMonthRemainingDays <= prevMonthDays) {
      this.daysInMonth.push({
        day: prevMonthRemainingDays++,
        month: prevMonthDate.getMonth(),
        year: prevMonthDate.getFullYear(),
      });
    }
    /*Populating daysInMonth with current month days*/
    let i = 1;
    while (i <= currentMonthDays) {
      this.daysInMonth.push({
        day: i++,
        month: this.month,
        year: this.year,
      });
    }
    /*Populating daysInMonth with next month remaining days*/
    i = 1;
    while (i < nextMonthRemainingDays) {
      this.daysInMonth.push({
        day: i++,
        month: nextMonthDate.getMonth(),
        year: nextMonthDate.getFullYear(),
      });
    }
  }

  public handleNextMonth(): void {
    const nextDate = getNextMonth(new Date(this.year, this.month));
    this.store.dispatch(
      setDate({
        date: {
          day: 1,
          month: nextDate.getMonth(),
          year: nextDate.getFullYear(),
        },
      })
    );
  }

  public handlePrevMonth(): void {
    const prevDate = getPrevMonth(new Date(this.year, this.month));
    this.store.dispatch(
      setDate({
        date: {
          day: 1,
          month: prevDate.getMonth(),
          year: prevDate.getFullYear(),
        },
      })
    );
  }

  public handleDayClick(date: IDay): void {
    this.store.dispatch(setDate({ date: { ...date } }));
  }

  public checkActiveDayAndMonth(date: IDay): string {
    if (date.month !== this.month) {
      return 'not-current-month';
    } else if (date.day === this.day) {
      return 'current-day';
    } else {
      return '';
    }
  }

  public checkForAppointment(value: IDay): string {
    let classString = '';

    this.appointments.find((appointment: IAppointment) => {
      if (
        appointment.date.getDate() === value.day &&
        appointment.date.getMonth() === value.month &&
        appointment.date.getFullYear() === value.year
      ) {
        if (
          appointment.date.getDate() < this.day ||
          appointment.date.getMonth() < this.month ||
          appointment.date.getFullYear() < this.year
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
