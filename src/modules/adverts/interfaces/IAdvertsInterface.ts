import Advert from '../infra/database/entities/Advert';

interface IAdvertDTO {
  user_id: string;
  name: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  in_stock: number;
}

export default interface IAdvertsInterface {
  create(advertData: IAdvertDTO): Promise<Advert>;
  findById(advert_id: string): Promise<Advert | undefined>;
  searchAdverts(search_keyword: string): Promise<(Advert | undefined)[]>;
  removeStockQuantity(advert_id: string): Promise<Advert>;
  increseStockQuantitiy(advert_id: string): Promise<Advert>;
  save(advert: Advert): Promise<Advert>;
}
