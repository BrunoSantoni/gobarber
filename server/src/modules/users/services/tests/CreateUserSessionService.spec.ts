import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserSessionService from '../CreateUserSessionService';
import CreateUserService from '../CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new CreateUserSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.run({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUser.run({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate if the password is incorrect', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new CreateUserSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.run({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      authenticateUser.run({
        email: 'johndoe@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate if the email is incorrect', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new CreateUserSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.run({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      authenticateUser.run({ email: 'john@john.com', password: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
