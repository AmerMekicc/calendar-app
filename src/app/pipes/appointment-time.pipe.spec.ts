import { AppointmentTimePipe } from './appointment-time.pipe';

describe('AppointmentTimePipe', () => {
  it('create an instance', () => {
    const pipe = new AppointmentTimePipe();
    expect(pipe).toBeTruthy();
  });
});
