import { IAppointment } from './appointment';

export interface IHotel {
  name: string;
  address: string;
  appointments: IAppointment[];
}
