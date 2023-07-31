import { describe, expect, it } from 'vitest';
import { CreateAppointment } from './create-appointments';
import { Appointment } from '../entities/appointment';
import { getFutureDate } from '../utils/get-future-date';
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository';

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate('2023-10-10');
    const endsAt = getFutureDate('2023-10-12');

    expect(
      createAppointment.execute({
        customer: 'Jhon Doe',
        startsAt,
        endsAt,
      }),
    ).resolves.toBeInstanceOf(Appointment);
  });

  it('it should not be able to create an appointment with overlaping dates', async () => {
    const startsAt = getFutureDate('2023-10-10');
    const endsAt = getFutureDate('2023-10-15');

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    await createAppointment.execute({
      customer: 'Jhon Doe',
      startsAt,
      endsAt,
    });

    try {
      await createAppointment.execute({
        customer: 'Jhon Doe',
        startsAt: getFutureDate('2023-08-14'),
        endsAt: getFutureDate('2023-08-18'),
      });

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
