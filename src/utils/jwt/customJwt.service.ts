import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class CustomJwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      console.log('customJwtService runs k' + token + 'k');
      const res = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('customJwtService visible');
      console.log(res);
      return res;
    } catch (err) {
      console.log('customJwtService error', err);
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}
