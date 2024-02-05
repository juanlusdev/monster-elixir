import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from '../infrastructure/repositories/users.repository';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneByEmail(email);
  }

  async create(
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    password: string,
  ) {
    const user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.role = role;
    user.password = password;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    return await this.usersRepository.create(user);
  }
}
