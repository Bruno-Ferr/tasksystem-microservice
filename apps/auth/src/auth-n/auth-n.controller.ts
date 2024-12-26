import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthNService } from './auth-n.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthNController {
  constructor(private AuthNService: AuthNService) {}

  @MessagePattern('auth.login')
  LogIn(@Payload() data: any) {
    return this.AuthNService.LogIn(data.email, data.password);
  }

  @MessagePattern('auth.signin')
  SignIn(@Payload() data: any) {
    return this.AuthNService.SignIn(data.email, data.password);
  }

  @MessagePattern('auth.testando')
  Teste() {
    return this.AuthNService.Teste();
  }
}
