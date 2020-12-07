import { injectable, inject } from 'tsyringe';

import Advert from '../infra/database/entities/Advert';

import IAdvertsInterface from '../interfaces/IAdvertsInterface';

@injectable()
class SearchAdvertsService {
  constructor(
    @inject('AdvertsRepository')
    private advertsRepository: IAdvertsInterface
  ) {}

  public async execute(
    search_keyword: string
  ): Promise<(Advert | undefined)[]> {}
}

export default SearchAdvertsService;
