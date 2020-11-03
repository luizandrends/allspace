import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import queueApi from '@apis/queue';

import IUsersRepository from '../interfaces/IUsersInterface';
import IUserTokensRepository from '../interfaces/IUserTokensInterface';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }
    const { name } = user;
    const { token } = await this.userTokensRepository.generate(user.id);

    await queueApi.post('/forgot/password', {
      name,
      email,
      token,
    });
  }
}

export default SendForgotPasswordEmailService;
