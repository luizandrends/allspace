import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/interfaces/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteAdvertService from './DeleteAdvertService';
import FakeAdvertsRepository from '../interfaces/fakes/FakeAdvertsRepository';

import CreateAdvertService from './CreateAdvertService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAdvertsRepository: FakeAdvertsRepository;
let fakeHashProvider: FakeHashProvider;
let createAdvertService: CreateAdvertService;
let createUserService: CreateUserService;
let deleteAdvertService: DeleteAdvertService;

describe('DeleteAdvert', () => {
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

    deleteAdvertService = new DeleteAdvertService(fakeAdvertsRepository);
  });

  it('should be able to delete an advert', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '100.100.100-10',
      password: '123456',
    };

    const user = await createUserService.execute(userData);

    const advertData = {
      user_id: user.id,
      name: 'Playstation 5',
      price: 4500,
      description: 'Sony videogame',
      brand: 'Sony',
      model: 'Playstation 5',
      color: 'White',
      in_stock: 40,
    };

    const advert = await createAdvertService.execute(advertData);

    await deleteAdvertService.execute({
      user_id: user.id,
      advert_id: advert.id,
    });

    const deletedDate = advert.deleted_at;

    expect(advert.deleted_at).toEqual(deletedDate);
  });

  it('should not be able to delete an unexistent advert', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '100.100.100-10',
      password: '123456',
    };

    const user = await createUserService.execute(userData);

    await expect(
      deleteAdvertService.execute({
        user_id: user.id,
        advert_id: '3dc7d7d6-696d-4e68-9b13-2f1deb7d46d5',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete an advert from another user', async () => {
    const advertOwner = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '100.100.100-10',
      password: '123456',
    };

    const commonUser = {
      name: 'James Doe',
      email: 'jamesdoe@example.com',
      cpf: '100.100.100-20',
      password: '123456',
    };

    const owner = await createUserService.execute(advertOwner);
    const common = await createUserService.execute(commonUser);

    const advertData = {
      user_id: owner.id,
      name: 'Playstation 5',
      price: 4500,
      description: 'Sony videogame',
      brand: 'Sony',
      model: 'Playstation 5',
      color: 'White',
      in_stock: 40,
    };

    const advert = await createAdvertService.execute(advertData);

    await expect(
      deleteAdvertService.execute({
        user_id: common.id,
        advert_id: advert.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
