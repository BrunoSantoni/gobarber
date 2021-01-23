import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '../CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.run({
      date: new Date(),
      providerId: '123456789',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('123456789');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2021, 0, 21, 21);

    await createAppointment.run({
      date: appointmentDate,
      providerId: '123123',
    });

    expect(
      createAppointment.run({
        date: appointmentDate,
        providerId: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});