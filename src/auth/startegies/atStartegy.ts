import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../types/jwtPayload.type';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => this.jwtExtractor(req),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return { sub: payload.sub, username: payload.username };
  }

  jwtExtractor(request: Request): string | null {
    const token = request?.header['access_token'];
    if (!token) return null;

    console.log(token);

    return token;
  }
}
