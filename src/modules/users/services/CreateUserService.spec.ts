import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../interfaces/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '100.100.100-10',
      password: '123456',
    };

    const createUser = await createUserService.execute(userData);

    expect(createUser).toHaveProperty('id');
  });

  it('should not be able to create an user with a existent email', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '100.100.100-10',
      password: '123456',
    };

    await createUserService.execute(userData);

    userData.cpf = '100.100.100-20';

    await expect(createUserService.execute(userData)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it('should not be able to create an user with a existent cpf', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '100.100.100-10',
      password: '123456',
    };

    await createUserService.execute(userData);

    userData.email = 'johndoe@example.com';

    await expect(createUserService.execute(userData)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
