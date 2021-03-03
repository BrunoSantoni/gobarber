import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { providerId, date } = req.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.run({
      providerId,
      userId,
      date,
    });

    return res.json(appointment);
  }
}

export default AppointmentsController;
