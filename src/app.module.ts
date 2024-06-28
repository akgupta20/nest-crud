import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { LoginMiddlewareModule } from './modules/users/middleware/login.middleware.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, LoginMiddlewareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
