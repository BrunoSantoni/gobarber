import { Router } from 'express';

import CreateUserSessionService from '@modules/users/services/CreateUserSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = new CreateUserSessionService();

  const { user, token } = await authenticateUser.run({ email, password });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
