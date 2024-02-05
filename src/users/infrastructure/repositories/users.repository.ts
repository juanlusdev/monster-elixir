import { User } from 'src/users/domain/entities/user.entity';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';

export const USERS_REPOSITORY = 'UsersRepository';

export interface UsersRepository {
  isValidId(id: string): boolean;
  create(user: CreateUserDto): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  update(id: string, user: UpdateUserDto): Promise<User>;
  remove(id: string): Promise<void>;
}
