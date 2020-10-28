import { container } from 'tsyringe';

import IUsersInterface from '@modules/users/interfaces/IUsersInterface';
import UsersRepository from '@modules/users/infra/database/repositories/UsersRepository';

container.registerSingleton<IUsersInterface>(
  'UsersRepository',
  UsersRepository
);
