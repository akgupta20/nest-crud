import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from 'src/utils/jwt/jwt.module';
import { LoginMiddlewareService } from './login.middleware.service';

@Module({
  imports: [JwtModule],
  providers: [LoginMiddlewareService],
  exports: [LoginMiddlewareService],
})
export class LoginMiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginMiddlewareService)
      .forRoutes(
        { path: 'users/:userId', method: RequestMethod.DELETE },
        { path: 'users/:userId', method: RequestMethod.PUT },
      );
  }
}
