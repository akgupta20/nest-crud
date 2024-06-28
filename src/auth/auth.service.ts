import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { CustomJwtService } from '../utils/jwt/customJwt.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: CustomJwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log('From validateUser');
    console.log(user);
    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (user && (await bcrypt.compare(password, user.password))) {
      // const userObject = user
      // console.log(userObject)
      delete user.password;

      return user;
    }
    return null;
  }

  async login(userInfo: LoginDto) {
    const user = await this.validateUser(userInfo.email, userInfo.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    const access_token = await this.jwtService.generateToken(payload);
    return { user, access_token };
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyToken(token);
  }
}
