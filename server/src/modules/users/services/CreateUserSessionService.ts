import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateUserSessionService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async run({ email, password }: IRequestDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const secret =
      process.env.NODE_ENV === 'test' ? 'testSecret' : process.env.JWT_SECRET;
    const expirationTime =
      process.env.NODE_ENV === 'test' ? '1d' : process.env.JWT_EXPIRATION_TIME;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expirationTime,
    });

    return { user, token };
  }
}

export default CreateUserSessionService;
