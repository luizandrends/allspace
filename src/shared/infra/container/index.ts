import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersInterface from '@modules/users/interfaces/IUsersInterface';
import UsersRepository from '@modules/users/infra/database/repositories/UsersRepository';

import IUserTokensInterface from '@modules/users/interfaces/IUserTokensInterface';
import UserTokensRepository from '@modules/users/infra/database/repositories/UserTokensRepository';

import IBlacklistTokensInterface from '@modules/users/interfaces/IBlacklistTokensInterface';
import BlacklistTokensRepository from '@modules/users/infra/database/repositories/BlacklistTokensRepository';

container.registerSingleton<IUsersInterface>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokensInterface>(
  'UserTokensRepository',
  UserTokensRepository
);

container.registerSingleton<IBlacklistTokensInterface>(
  'BlacklistTokensRepository',
  BlacklistTokensRepository
);
