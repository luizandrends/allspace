import { v4 } from 'uuid';

import Advert from '@modules/adverts/infra/database/entities/Advert';
import IAdvertsInterface from '../IAdvertsInterface';
import IAdvertDTO from '../../dtos/IAdvertDTO';

class FakeAdvertsRepository implements IAdvertsInterface {
  private adverts: Advert[] = [];

  public async create(advertData: IAdvertDTO): Promise<Advert> {
    const advert = new Advert();

    Object.assign(advert, { id: v4() }, advertData);

    this.adverts.push(advert);

    return advert;
  }

  public async findById(advert_id: string): Promise<Advert | undefined> {
    const findAdvert = this.adverts.find(advert => advert.id === advert_id);

    return findAdvert;
  }

  public async searchAdverts(
    advert_keyword: string
  ): Promise<(Advert | undefined)[]> {
    const findAdverts = this.adverts.map(advert => {
      return advert.name === advert_keyword ? advert : undefined;
    });

    return findAdverts;
  }

  public async removeStockQuantity(
    advert_id: string,
    quantity: number
  ): Promise<Advert> {
    const findIndex = this.adverts.findIndex(
      findAdvert => findAdvert.id === advert_id
    );

    const advert = this.adverts[findIndex];

    const stockQuantity = advert.in_stock;

    Object.assign(advert, { in_stock: stockQuantity - quantity });

    return advert;
  }

  public async increaseStockQuantitiy(
    advert_id: string,
    quantity: number
  ): Promise<Advert> {
    const findIndex = this.adverts.findIndex(
      findAdvert => findAdvert.id === advert_id
    );

    const advert = this.adverts[findIndex];

    const stockQuantity = advert.in_stock;

    Object.assign(advert, { in_stock: stockQuantity + quantity });

    return advert;
  }

  public async save(advert: Advert): Promise<Advert> {
    const findIndex = this.adverts.findIndex(
      findAdvert => findAdvert.id === advert.id
    );

    this.adverts[findIndex] = advert;

    return advert;
  }
}

export default FakeAdvertsRepository;
