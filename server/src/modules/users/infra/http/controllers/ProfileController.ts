import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.run({
      userId,
    });

    delete user.password;

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { name, email, oldPassword, password } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.run({
      userId,
      name,
      email,
      oldPassword,
      password,
    });

    delete user.password;

    return res.json(user);
  }
}

export default ProfileController;
