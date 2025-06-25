import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
/*
- Purpose: Validates short-lived access tokens
- How it works: Extracts the JWT from the Authorization header, verifies it with the secret key, and attaches the payload to the request
*/

export type JWTPayload = {
  sub: number;
  email: string;
  role: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-at') {
  constructor(private readonly configServices: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Bearer token extraction from Authorization header
      secretOrKey: configServices.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'), //Access token secret key
    });
  }

  validate(payload: JWTPayload) {
    return payload; // Return the payload directly, which contains user information (attach request.user = payload;)
  }
}
