import FakeUsersRepository from '@modules/users/interfaces/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeAdvertsRepository from '../interfaces/fakes/FakeAdvertsRepository';

import CreateAdvertService from './CreateAdvertService';
import AddStockQuantityService from './AddStockQuantityService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAdvertsRepository: FakeAdvertsRepository;
let fakeHashProvider: FakeHashProvider;
let createAdvertService: CreateAdvertService;
let createUserService: CreateUserService;
let addStockQuantityService: AddStockQuantityService;

describe('AddInStock', () => {
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

    addStockQuantityService = new AddStockQuantityService(
      fakeAdvertsRepository
    );
  });

  it('should be to increase the advert stock number', async () => {
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

    const increaseStock = await addStockQuantityService.execute({
      advert_id: advert.id,
      quantity: 2,
    });

    const advertExpected = {
      user_id: id,
      name: 'Playstation 5',
      price: 4500,
      description: 'Sony videogame',
      brand: 'Sony',
      model: 'Playstation 5',
      color: 'White',
      in_stock: 42,
    };

    expect(increaseStock).toEqual(advertExpected);
  });

  it('should not be able to increase an unexistent advert', async () => {
    await expect(
      addStockQuantityService.execute({
        advert_id: 'd85cb127-3d02-4b6d-9e5b-cd349259e438',
        quantity: 2,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
