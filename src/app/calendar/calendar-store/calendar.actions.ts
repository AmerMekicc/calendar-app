import { createAction, props } from '@ngrx/store';
import { IDay } from 'src/assets/models/day';

export const setDate = createAction(
  '[Calendar Page] Set Date',
  props<{ date: IDay }>()
);
