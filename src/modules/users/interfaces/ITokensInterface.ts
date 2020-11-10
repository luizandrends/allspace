import ITokenDTO from '../dtos/ITokenDTO';
import Token from '../infra/database/schemas/Token';

export default interface ITokensInterface {
  create(payload: ITokenDTO): Promise<Token>;
  findByToken(token: string): Promise<Token | undefined>;
}
