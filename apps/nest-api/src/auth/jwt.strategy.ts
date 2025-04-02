import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'src/env';
import { JwtPayload } from 'src/types/jwtPayload';
import { RequestUser } from 'src/types/requestUser';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<RequestUser> {
    return {
      id: payload.sub,
      name: payload.username,
      status: payload.status,
    };
  }
}
