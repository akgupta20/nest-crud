import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomJwtService } from '../../../utils/jwt/customJwt.service';

@Injectable()
export class LoginMiddlewareService implements NestMiddleware {
  constructor(private readonly jwtService: CustomJwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      console.log(token);
      try {
        await this.jwtService.verifyToken(token);
        next();
      } catch (err) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    } else {
      throw new UnauthorizedException('Token not found');
    }
  }
}
