import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { getDay, getDaysInMonth } from 'date-fns';
import { loadAppointments } from 'src/app/appointments/appointments-store/appointments.actions';
import {
  getNextMonth,
  getPrevMonth,
  monthNames,
  weekDays,
} from 'src/assets/calendarAssets';
import { IAppointment } from 'src/assets/models/appointment';
import { IDay } from 'src/assets/models/day';
import { IHour } from 'src/assets/models/hour';
import { setDate } from '../calendar-store/calendar.actions';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.scss'],
})
export class WeekCalendarComponent implements OnInit, OnChanges {
  @Input() day = 0;
  @Input() month = 0;
  @Input() year = 0;
  @Input() appointments: IAppointment[] = [];
  clickedAppointment: IHour = {} as IHour;
  weekAppointments: IAppointment[] = [];
  week: IDay[] = [];
  headerString = '';
  leftArrowIcon = faAngleLeft;
  rightArrowIcon = faAngleRight;
  weekDays = weekDays;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadAppointments());
  }

  ngOnChanges(): void {
    this.setWeek();
    this.setHeaderString();
    this.appointments = this.sortAppointmentsByDate();
    this.weekAppointments = this.getWeekAppointments();
  }

  private sortAppointmentsByDate(): IAppointment[] {
    let sortArray = [...this.appointments];
    sortArray = sortArray.sort(
      (a: IAppointment, b: IAppointment) => a.date.getTime() - b.date.getTime()
    );
    sortArray = sortArray.map((appointment: IAppointment, index: number) => {
      return (appointment = { ...appointment, index: index });
    });

    return sortArray;
  }

  private setHeaderString(): void {
    if (this.week[0].month !== this.week[6].month) {
      this.headerString = `${this.week[0].day} - ${this.week[6].day} ${
        monthNames[this.week[0].month]
      } / ${monthNames[this.week[6].month]} ${this.year}`;
    } else {
      this.headerString = `${this.week[0].day} - ${this.week[6].day} ${
        monthNames[this.week[0].month]
      } ${this.year}`;
    }
  }

  /*Calculating the beginning of the selected week*/
  private setWeek(): void {
    this.week = [];
    let weekMonth = this.month;
    let weekYear = this.year;
    const currentWeekDay = getDay(new Date(this.year, this.month, this.day));
    const prevMonthNumberOfDays = getDaysInMonth(
      getPrevMonth(new Date(this.year, this.month))
    );
    const currentMonthNumberOfDays = getDaysInMonth(
      new Date(this.year, this.month)
    );
    /*Week beginning equals selected day of the month minus week day index of that day*/
    let firstDayOfTheWeek = this.day - currentWeekDay;
    /**If the result is 0 or less that means the start of the week isn't in the same month*/
    if (firstDayOfTheWeek <= 0) {
      firstDayOfTheWeek = firstDayOfTheWeek + prevMonthNumberOfDays;
      const prevWeekDate = getPrevMonth(new Date(weekYear, weekMonth));
      weekMonth = prevWeekDate.getMonth();
      weekYear = prevWeekDate.getFullYear();
    }
    let weekDay = firstDayOfTheWeek;
    //increasing weekDay by 1, it goes 7 times since there is 7 days in a week
    for (let i = 0; i < 7; i++) {
      //if weekDay goes over the months number of days, we set the weekDay to 1 and change the month
      if (
        (weekDay > prevMonthNumberOfDays && this.month !== weekMonth) ||
        (weekDay > currentMonthNumberOfDays && this.month === weekMonth)
      ) {
        weekDay = 1;
        const nextWeekDate = getNextMonth(new Date(weekYear, weekMonth));
        weekMonth = nextWeekDate.getMonth();
        weekYear = nextWeekDate.getFullYear();
      }
      this.week.push({
        day: weekDay++,
        month: weekMonth,
        year: weekYear,
      });
    }
  }

  public handleNextWeek(): void {
    let nextWeekStartDay = this.week[6].day + 1;
    let currentWeekMonth = this.week[6].month;
    let currentWeekYear = this.week[6].year;

    if (
      nextWeekStartDay >
      getDaysInMonth(new Date(currentWeekYear, currentWeekMonth))
    ) {
      nextWeekStartDay = 1;
      const nextMonthDate = getNextMonth(
        new Date(currentWeekYear, currentWeekMonth)
      );
      currentWeekMonth = nextMonthDate.getMonth();
      currentWeekYear = nextMonthDate.getFullYear();
    }

    this.store.dispatch(
      setDate({
        date: {
          day: nextWeekStartDay,
          month: currentWeekMonth,
          year: currentWeekYear,
        },
      })
    );
  }

  public handlePrevWeek(): void {
    let prevWeekStartDay = this.week[0].day - 1;
    let prevWeekMonth = this.week[0].month;
    let prevWeekYear = this.week[0].year;

    if (prevWeekStartDay < 1) {
      const prevWeekDate = getPrevMonth(new Date(prevWeekYear, prevWeekMonth));
      prevWeekStartDay = getDaysInMonth(prevWeekDate);
      prevWeekMonth = prevWeekDate.getMonth();
      prevWeekYear = prevWeekDate.getFullYear();
    }

    this.store.dispatch(
      setDate({
        date: {
          day: prevWeekStartDay,
          month: prevWeekMonth,
          year: prevWeekYear,
        },
      })
    );
  }

  private getWeekAppointments(): IAppointment[] {
    const filteredArray = [] as IAppointment[];
    this.appointments;
    this.appointments.forEach((data: IAppointment) => {
      this.week.forEach((weekDay: IDay) => {
        if (
          weekDay.day === data.date.getDate() &&
          weekDay.month === data.date.getMonth() &&
          weekDay.year === data.date.getFullYear()
        ) {
          filteredArray.push(data);
        }
      });
    });
    return filteredArray;
  }

  public getNextAppointment(value: IHour): void {
    let indexOfLastWeekAppointment = this.appointments.length;
    let indexOfNextAppointment = 0;
    let nextAppointment = {} as IHour;
    const nextAppointments = [] as IAppointment[];

    indexOfLastWeekAppointment =
      value.appointments[value.appointments.length - 1].index;
    indexOfNextAppointment = indexOfLastWeekAppointment + 1;

    nextAppointment = {
      day: this.appointments[indexOfNextAppointment].date.getDate(),
      month: this.appointments[indexOfNextAppointment].date.getMonth(),
      year: this.appointments[indexOfNextAppointment].date.getFullYear(),
      startHour: this.appointments[indexOfNextAppointment].date.getHours(),
      endHour: this.appointments[indexOfNextAppointment].date.getHours() + 1,
      weekDay: getDay(this.appointments[indexOfNextAppointment].date),
      name: '',
      appointments: [],
    };

    this.appointments.forEach((data: IAppointment) => {
      if (
        data.date.getDate() === nextAppointment.day &&
        data.date.getHours() === nextAppointment.startHour
      ) {
        nextAppointments.push(data);
      }
    });
    nextAppointment.appointments = [...nextAppointments];
    this.clickedAppointment = { ...nextAppointment };
    this.store.dispatch(
      setDate({
        date: {
          day: nextAppointment.day,
          month: nextAppointment.month,
          year: nextAppointment.year,
        },
      })
    );
  }

  public getPrevAppointment(value: IHour): void {
    let indexOfLastWeekAppointment = 0;
    let indexOfPrevAppointment = 0;
    let nextAppointment = {} as IHour;
    const nextAppointments = [] as IAppointment[];

    indexOfLastWeekAppointment = value.appointments[0].index;
    indexOfPrevAppointment = indexOfLastWeekAppointment - 1;

    nextAppointment = {
      day: this.appointments[indexOfPrevAppointment].date.getDate(),
      month: this.appointments[indexOfPrevAppointment].date.getMonth(),
      year: this.appointments[indexOfPrevAppointment].date.getFullYear(),
      startHour: this.appointments[indexOfPrevAppointment].date.getHours(),
      endHour: this.appointments[indexOfPrevAppointment].date.getHours() + 1,
      weekDay: getDay(this.appointments[indexOfPrevAppointment].date),
      name: '',
      appointments: [],
    };
    this.appointments.forEach((data: IAppointment) => {
      if (
        data.date.getDate() === nextAppointment.day &&
        data.date.getMonth() === nextAppointment.month &&
        data.date.getFullYear() === nextAppointment.year &&
        data.date.getHours() === nextAppointment.startHour
      ) {
        nextAppointments.push(data);
      }
    });
    nextAppointment.appointments = [...nextAppointments];
    this.clickedAppointment = { ...nextAppointment };
    this.store.dispatch(
      setDate({
        date: {
          day: nextAppointment.day,
          month: nextAppointment.month,
          year: nextAppointment.year,
        },
      })
    );
  }
}
