import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from '../CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });

    const appointment = await createAppointment.run({
      date: new Date(2021, 0, 10, 13),
      providerId: '123456789',
      userId: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('123456789');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });

    const appointmentDate = new Date(2021, 0, 10, 13);

    await createAppointment.run({
      date: appointmentDate,
      providerId: 'provider-id',
      userId: 'user-id',
    });

    await expect(
      createAppointment.run({
        date: appointmentDate,
        providerId: 'provider-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });

    await expect(
      createAppointment.run({
        date: new Date(2021, 0, 10, 11),
        providerId: 'provider-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });

    await expect(
      createAppointment.run({
        date: new Date(2021, 0, 10, 13),
        providerId: 'user-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment outside the available schedule (before 8AM and after 5PM)', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });

    await expect(
      createAppointment.run({
        date: new Date(2021, 0, 11, 7),
        providerId: 'provider-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.run({
        date: new Date(2021, 0, 11, 18),
        providerId: 'provider-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
