import User from '../infra/database/entities/User';
import IUsersDTO from '../dtos/IUserDTO';

export default interface IUsersInterface {
  create(userData: IUsersDTO): Promise<User>;
  findById(user_id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
