import { injectable, inject } from 'tsyringe';

import IUsersInterface from '@modules/users/interfaces/IUsersInterface';
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

  public async execute(advertData: IAdvertDTO): Promise<Advert> {}
}

export default CreateAdvertService;
