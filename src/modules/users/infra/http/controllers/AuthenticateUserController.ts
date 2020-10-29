import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class AuthenticateUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const authenticateUser = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json(authenticateUser);
  }
}

export default AuthenticateUserController;
