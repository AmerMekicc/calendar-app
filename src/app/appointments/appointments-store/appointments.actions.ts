import { createAction, props } from '@ngrx/store';
import { IAppointment } from 'src/assets/models/appointment';

export const loadAppointments = createAction('[Load Appointments] Loading');

export const loadAppointmentsSuccess = createAction(
  '[Load Appointments] Success',
  props<{ data: IAppointment[] }>()
);

export const loadAppointmentsFailed = createAction(
  '[Load Appointments] Failed'
);
