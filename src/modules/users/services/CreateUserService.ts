import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/database/entities/User';
import IUserDTO from '../dtos/IUserDTO';
import IUsersInterface from '../interfaces/IUsersInterface';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersInterface,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute(userData: IUserDTO): Promise<User> {
    const { name, email, cpf, password } = userData;

    const findUserByEmail = await this.usersRepository.findByEmail(email);
    const findUserByCpf = await this.usersRepository.findByCpf(cpf);

    if (findUserByCpf || findUserByEmail) {
      throw new AppError('Email or cpf already in database', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const createUserData = {
      name,
      email,
      cpf,
      password: hashedPassword,
    };

    const user = await this.usersRepository.create(createUserData);

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
