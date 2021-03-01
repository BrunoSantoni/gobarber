import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserSessionService from '@modules/users/services/CreateUserSessionService';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(CreateUserSessionService);

    const { user, token } = await authenticateUser.run({ email, password });

    return res.json({ user: classToClass(user), token });
  }
}

export default SessionsController;
