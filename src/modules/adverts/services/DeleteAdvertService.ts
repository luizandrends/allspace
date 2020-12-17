import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAdvertsInterface from '../interfaces/IAdvertsInterface';

interface IRequest {
  user_id: string;
  advert_id: string;
}

@injectable()
class DeleteAdvertService {
  constructor(
    @inject('AdvertsRepository')
    private advertsRepository: IAdvertsInterface
  ) {}

  public async execute({ user_id, advert_id }: IRequest): Promise<void> {
    const advert = await this.advertsRepository.findById(advert_id);

    if (!advert) {
      throw new AppError('You can not delete an unexistent advert', 400);
    }

    if (user_id !== advert.user_id) {
      throw new AppError('Only the owner can delete his own advert', 401);
    }

    advert.deleted_at = new Date();

    await this.advertsRepository.save(advert);
  }
}

export default DeleteAdvertService;
