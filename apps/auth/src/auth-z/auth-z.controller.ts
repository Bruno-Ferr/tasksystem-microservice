import { Controller, Get, Req } from '@nestjs/common';
import { AuthZService } from './auth-z.service';
import { Request } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthZController {
  constructor(private AuthZService: AuthZService) {}

  @MessagePattern("auth.verifyToken")
  async verifyToken(@Payload() request: any): Promise<any> {
    return await this.AuthZService.VerifyJWT(request.data);
  } 
}
