import { ObjectID } from 'mongodb';

import IBlacklistTokensInterface from '@modules/users/interfaces/IBlacklistTokensInterface';

import ITokenDTO from '../../dtos/ITokenDTO';

import Token from '../../infra/database/schemas/Token';

class FakeBlacklistTokensRepository implements IBlacklistTokensInterface {
  private tokens: Token[] = [];

  public async create(payload: ITokenDTO): Promise<Token> {
    const { token: usedToken } = payload;
    const token = new Token();

    Object.assign(token, {
      id: new ObjectID(),
      token: usedToken,
    });

    this.tokens.push(token);

    return token;
  }

  public async findByToken(token: string): Promise<Token | undefined> {
    const findUsedToken = this.tokens.find(
      findToken => findToken.token === token
    );

    return findUsedToken;
  }
}

export default FakeBlacklistTokensRepository;
