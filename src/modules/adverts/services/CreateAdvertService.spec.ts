import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/interfaces/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeAdvertsRepository from '../interfaces/fakes/FakeAdvertsRepository';

import CreateAdvertService from './CreateAdvertService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAdvertsRepository: FakeAdvertsRepository;
let fakeHashProvider: FakeHashProvider;
let createAdvertService: CreateAdvertService;
let createUserService: CreateUserService;

describe('CreateAdvert', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAdvertsRepository = new FakeAdvertsRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    createAdvertService = new CreateAdvertService(
      fakeUsersRepository,
      fakeAdvertsRepository
    );
  });

  it('should be able to create a new advert', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '100.100.100-10',
      password: '123456',
    };

    const user = await createUserService.execute(userData);

    const { id } = user;

    const advertData = {
      user_id: id,
      name: 'Playstation 5',
      price: 4500,
      description: 'Sony videogame',
      brand: 'Sony',
      model: 'Playstation 5',
      color: 'White',
      in_stock: 40,
    };

    const advert = await createAdvertService.execute(advertData);

    expect(advert).toHaveProperty('id');
  });

  it('should not be able to create a new advert with an unexistent user', async () => {
    const advertData = {
      user_id: '5d9835e0-9044-4104-b229-d74f68f3a72b',
      name: 'Playstation 5',
      price: 4500,
      description: 'Sony videogame',
      brand: 'Sony',
      model: 'Playstation 5',
      color: 'White',
      in_stock: 40,
    };

    await expect(
      createAdvertService.execute(advertData)
    ).rejects.toBeInstanceOf(AppError);
  });
});
