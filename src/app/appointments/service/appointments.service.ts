import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAppointment } from 'src/assets/models/appointment';

export interface IAppointmentNode {
  id: string;
  date: Date;
  attendeeCount: number;
  maxInviteeCount: number;
  property: {
    name: string;
    address: {
      street: string;
      houseNumber: string;
      zipCode: string;
      city: string;
      country: string;
    };
  };
}
export interface IAppointmentMockData {
  data: {
    appointments: {
      nodes: IAppointmentNode[];
    };
  };
}
@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private url = 'assets/data.json';
  constructor(private http: HttpClient) {}

  public getAppointments(): Observable<IAppointment[]> {
    return this.http.get<IAppointmentMockData>(this.url).pipe(
      map((data) => {
        const appointment = [] as IAppointment[];
        data.data.appointments.nodes.forEach((node: IAppointmentNode) => {
          const address = `${node.property.address.street} ${node.property.address.houseNumber}, ${node.property.address.zipCode} ${node.property.address.city}, ${node.property.address.country}`;
          appointment.push({
            index: 0,
            id: node.id,
            date: new Date(node.date),
            atendeeCount: node.attendeeCount,
            maxInviteeCount: node.maxInviteeCount,
            propertyName: node.property.name,
            propertyAddress: address,
          });
        });
        return appointment;
      })
    );
  }
}
