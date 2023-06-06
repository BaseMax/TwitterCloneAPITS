import {
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import clientMessages from 'src/common/translation/fa';

@Injectable()
export class AtGuard {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['token'];
    console.log(token);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  handleRequest(err, user, info: Error) {
    if (err || info) throw new HttpException(clientMessages.auth.login, 498);

    return user;
  }
}
