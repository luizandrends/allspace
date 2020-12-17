import { injectable, inject } from 'tsyringe';

import IUsersInterface from '@modules/users/interfaces/IUsersInterface';
import AppError from '@shared/errors/AppError';
import Advert from '../infra/database/entities/Advert';

import IAdvertsInterface from '../interfaces/IAdvertsInterface';

import IAdvertDTO from '../dtos/IAdvertDTO';

@injectable()
class CreateAdvertService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersInterface,

    @inject('AdvertsRepository')
    private advertsRepository: IAdvertsInterface
  ) {}

  public async execute(advertData: IAdvertDTO): Promise<Advert> {
    const { user_id } = advertData;

    const findUserById = await this.usersRepository.findById(user_id);

    if (!findUserById) {
      throw new AppError('User not found', 400);
    }

    const advert = await this.advertsRepository.create(advertData);

    return advert;
  }
}

export default CreateAdvertService;
