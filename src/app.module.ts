import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MonstersModule } from './monsters/monsters.module';
import { UsersModule } from './users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('MONGODB_URI'),
        };
      },
    }),
    AuthModule,
    MonstersModule,
    UsersModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          password: 'JNUQIivJInzSxbSQe0iG5K9GPod2ZNVR',
          username: 'default',
          socket: {
            host: 'redis-12146.c238.us-central1-2.gce.cloud.redislabs.com',
            port: 12146,
          },
        }),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
