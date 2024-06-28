import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../modules/users/users.module';
import { JwtModule } from 'src/utils/jwt/jwt.module';

@Module({
  imports: [UsersModule, JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
