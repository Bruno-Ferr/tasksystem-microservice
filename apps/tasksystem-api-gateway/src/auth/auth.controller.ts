import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  LogIn(@Body() SignInData: Record<string, string>) {
    return this.AuthService.LogIn(SignInData.email, SignInData.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  SignIn(@Body() SignInData: Record<string, string>) {
    return this.AuthService.SignIn(SignInData.email, SignInData.password);
  }

  @Get()
  verifyToken(@Req() request: Request) {
    return this.AuthService.verifyToken(request);
  } 

  @Get('/teste')
  teste() {
    return this.AuthService.teste();
  } 
}
