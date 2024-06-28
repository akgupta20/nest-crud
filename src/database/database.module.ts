import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseProviders } from './database.providers';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'akash',
        database: 'postgres',
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
  ],
  providers: [...databaseProviders],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
