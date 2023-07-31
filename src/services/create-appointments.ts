import { Appointment } from '../entities/appointment';
import { AppointmentsRepository } from '../repositories/appointments-repository';

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}
type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlapingAppointment =
      await this.appointmentsRepository.findOverlapingAppointment(
        startsAt,
        endsAt,
      );
    if (overlapingAppointment) {
      throw new Error('Another appointment overlaps this appointment dates');
    }
    const appointment = new Appointment({
      customer,
      endsAt,
      startsAt,
    });

    return appointment;
  }
}
