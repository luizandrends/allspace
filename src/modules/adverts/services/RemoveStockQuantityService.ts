import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Advert from '../infra/database/entities/Advert';

import IAdvertsInterface from '../interfaces/IAdvertsInterface';

interface IRequest {
  advert_id: string;
  quantity: number;
}

@injectable()
class CreateAdvertService {
  constructor(
    @inject('AdvertsRepository')
    private advertsRepository: IAdvertsInterface
  ) {}

  public async execute({ advert_id, quantity }: IRequest): Promise<Advert> {}
}

export default CreateAdvertService;
