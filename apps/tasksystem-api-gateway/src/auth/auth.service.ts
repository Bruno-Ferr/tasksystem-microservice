import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { stringify } from 'querystring';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}

  LogIn(email: string, password: string) {
    return this.authClient.send('auth.login', {email, password});
    //return this.authClient.send('auth.login', {email, password});
  }

  SignIn(email: string, password: string) {
    return this.authClient.send('auth.signin', {email, password});
  }

  async verifyToken(request: Request) {
    const data = request.headers
    return this.authClient.send('auth.verifyToken', {data});
  }

  teste() {
    return this.authClient.send('auth.testando', {});
  }
}
