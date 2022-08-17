import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IDay } from 'src/assets/models/day';

export const selectDate = createSelector(
  createFeatureSelector('calendarState'),
  (state: IDay) => state
);
