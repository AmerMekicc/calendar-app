import { IAppointment } from './appointment';

export interface IHour {
  name: string;
  startHour: number;
  endHour: number;
  day: number;
  month: number;
  year: number;
  weekDay: number;
  appointments: IAppointment[];
}
