import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import {
  Categories,
  Movies,
  MoviesMetadatas,
  PreferenceCategories,
  UserMovies,
  UserPreferences,
  Users,
} from '../entities';
import * as process from 'process';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      schema: process.env.POSTGRES_SCHEMA,
      entities: [
        Movies,
        Users,
        UserPreferences,
        MoviesMetadatas,
        Categories,
        PreferenceCategories,
        UserMovies,
      ],
      extra: {
        charset: 'utf8mb4',
      },
      synchronize: true,
      logging: false,
    };
  },
};
