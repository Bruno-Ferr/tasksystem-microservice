import { Module } from '@nestjs/common';
import { AuthZController } from './auth-z.controller';
import { AuthZService } from './auth-z.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [AuthZController],
  providers: [AuthZService]
})
export class AuthZModule {}
