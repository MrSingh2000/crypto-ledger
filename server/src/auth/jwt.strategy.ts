import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader("authtoken"),
      ignoreExpiration: false,
      secretOrKey: "hello",
    });
  }

  async validate(payload: any) {
    // this return data will be provided as 'user' field in the request
    return { userId: payload.username };
  }
}