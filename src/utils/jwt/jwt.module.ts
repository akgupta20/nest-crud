import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { CustomJwtService } from './customJwt.service';

@Module({
  imports: [
    NestJwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  providers: [CustomJwtService],
  exports: [CustomJwtService],
})
export class JwtModule {}
