import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.run({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.password).toBe('123456');
  });

  it('should not be able to have two users with the same email ', async () => {
    await createUserService.run({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createUserService.run({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
