import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthZService {
  constructor(
    private jwtService: JwtService
  ) {}

  async VerifyJWT(request: any): Promise<{userId: number}> {
    const [, token] = request.authorization?.split(' ') ?? [];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret:  process.env.JWT_SECRET
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      //request['user'] = payload; ########## COMO FAZER PARA ACESSAR O REQUEST DEPOIS???
      return { userId: payload.sub }
    } catch {
      throw new UnauthorizedException();
    }
  }
}
