import { createReducer, on } from '@ngrx/store';
import { IAppointment } from 'src/assets/models/appointment';
import { loadAppointmentsSuccess } from './appointments.actions';

export interface AppointmentState {
  appointments: IAppointment[];
}

export const initialState: AppointmentState = {
  appointments: [],
};

export const appointmentsReducer = createReducer(
  initialState,
  on(loadAppointmentsSuccess, (state, { data }) => {
    return { ...state, appointments: [...data] };
  })
);
