import { AppointmentDatePipe } from './appointment-date.pipe';

describe('AppointmentDatePipe', () => {
  it('create an instance', () => {
    const pipe = new AppointmentDatePipe();
    expect(pipe).toBeTruthy();
  });
});
