import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private users = [
    {
      userId: 1,
      email: 'Bruno@email.com',
      password: 'Admin@123'
    }
  ]

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async createUser(email: string, password: string): Promise<String> {
    const newUser = {
      userId: this.users.length + 1,
      email,
      password
    }

    this.users.push(newUser);

    return 'User added';
  }

  showAll() {
    return this.users;
  }
}
