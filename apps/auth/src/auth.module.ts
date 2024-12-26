import { Module } from '@nestjs/common';
import { AuthZModule } from './auth-z/auth-z.module';
import { AuthNModule } from './auth-n/auth-n.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), 
    AuthNModule, 
    AuthZModule
  ],
  providers: [],
  exports: []
})
export class AuthenticationModule {}
