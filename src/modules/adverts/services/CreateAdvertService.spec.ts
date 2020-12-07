import FakeUsersRepository from '@modules/users/interfaces/fakes/FakeUsersRepository';
import FakeAdvertsRepository from '../interfaces/fakes/FakeAdvertsRepository';

import CreateAdvertService from './CreateAdvertService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAdvertsRepository: FakeAdvertsRepository;
let createAdvertService: CreateAdvertService;

describe('CreateAdvert', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAdvertsRepository = new FakeAdvertsRepository();

    createAdvertService = new CreateAdvertService(
      fakeUsersRepository,
      fakeAdvertsRepository
    );
  });

  it('should be able to create a new advert', async () => {
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

    const advert = await createAdvertService.execute(advertData);

    expect(advert).toHaveProperty('id');
  });
});
