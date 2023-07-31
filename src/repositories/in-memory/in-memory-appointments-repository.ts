import { AppointmentsRepository } from '../appointments-repository';
import { Appointment } from '../../entities/appointment';
import { areIntervalsOverlapping } from 'date-fns';

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public items: Appointment[] = [];

  async create(appointment: Appointment) {
    this.items.push(appointment);
  }
  async findOverlapingAppointment(
    startsAt: Date,
    endsAt: Date,
  ): Promise<Appointment | null> {
    const overlapingAppointment = this.items.find((appointment) => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true },
      );
    });
    if (!overlapingAppointment) {
      return null;
    }

    return overlapingAppointment;
  }
}
