import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId } from 'mongoose';
import { UsersRepository } from './users.repository';
import { UserModel } from '../schemas/user.schema';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { User } from 'src/users/domain/entities/user.entity';

@Injectable()
export class MongoUsersRepository implements UsersRepository {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  isValidId(id: string): boolean {
    return isValidObjectId(id);
  }

  async create(userData: User): Promise<User> {
    const user = await new this.userModel(userData).save();
    return user.toObject();
  }

  async findAll(limit: number, skip: number): Promise<User[]> {
    return await this.userModel.find({}, {}, { limit, skip });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { _id: id },
      { ...userDto, updatedAt: new Date() },
      { new: true },
    );
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true, deletedAt: new Date() },
    );
  }
}
