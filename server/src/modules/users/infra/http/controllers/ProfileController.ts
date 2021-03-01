import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.run({
      userId,
    });

    return res.json(classToClass(user));
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

    return res.json(classToClass(user));
  }
}

export default ProfileController;
