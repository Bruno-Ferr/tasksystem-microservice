import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthNService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async LogIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if(user?.password != password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async SignIn(email: string, password: string): Promise<String> {
    const user = await this.usersService.createUser(email, password);
    return user;
  }

  Teste(): any {
    return this.usersService.showAll();
  }
}
