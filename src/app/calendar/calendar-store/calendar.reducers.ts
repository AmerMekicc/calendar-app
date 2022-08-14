import { createReducer, on } from '@ngrx/store';
import { setDate } from './calendar.actions';

export interface CalendarState {
  day: number;
  month: number;
  year: number;
}

export const initialState: CalendarState = {
  day: new Date().getDate(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};

export const calendarReducer = createReducer(
  initialState,
  on(setDate, (state, { date }) => {
    return { ...state, day: date.day, month: date.month, year: date.year };
  })
);
