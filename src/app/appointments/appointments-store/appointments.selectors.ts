import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppointmentState } from './appointments.reducers';

export const selectAppointments = createSelector(
  createFeatureSelector('appointmentsState'),
  (state: AppointmentState) => state.appointments
);
