import Advert from '../infra/database/entities/Advert';
import IAdvertDTO from '../dtos/IAdvertDTO';

export default interface IAdvertsInterface {
  create(advertData: IAdvertDTO): Promise<Advert>;
  findById(advert_id: string): Promise<Advert | undefined>;
  searchAdverts(search_keyword: string): Promise<(Advert | undefined)[]>;
  removeStockQuantity(advert_id: string): Promise<Advert>;
  increaseStockQuantitiy(advert_id: string): Promise<Advert>;
  save(advert: Advert): Promise<Advert>;
}
