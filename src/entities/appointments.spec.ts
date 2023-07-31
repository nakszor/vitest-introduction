import { expect, test } from 'vitest';
import { Appointment } from './appointment';
import { getFutureDate } from '../utils/get-future-date';

test('create an appointment', () => {
  const startsAt = getFutureDate('2023-10-10');
  const endsAt = getFutureDate('2023-10-11');

  const appointment = new Appointment({
    customer: 'Jhon Doe',
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual('Jhon Doe');
});

test('cannot create an appointment with end date before start date', () => {
  const startsAt = getFutureDate('2023-08-10');
  const endsAt = getFutureDate('2023-08-09');

  expect(() => {
    return new Appointment({
      customer: 'Jhon Doe',
      startsAt,
      endsAt,
    });
  }).toThrow();
});

test('cannot create an appointment with end date before start date', () => {
  const startsAt = getFutureDate('2023-10-08');
  const endsAt = getFutureDate('2023-10-07');

  expect(() => {
    return new Appointment({
      customer: 'Jhon Doe',
      startsAt,
      endsAt,
    });
  }).toThrow();
});
