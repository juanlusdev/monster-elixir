import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { USERS_REPOSITORY } from './infrastructure/repositories/users.repository';
import { MongoUsersRepository } from './infrastructure/repositories/mongo-users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './infrastructure/schemas/user.schema';
import { User } from './domain/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UsersService,
    {
      provide: USERS_REPOSITORY,
      useClass: MongoUsersRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
