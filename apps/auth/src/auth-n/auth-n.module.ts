import { Module } from '@nestjs/common';
import { AuthNService } from './auth-n.service';
import { AuthNController } from './auth-n.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '7d'
          }
        }
      }
    })
  ],
  providers: [AuthNService],
  controllers: [AuthNController]
})
export class AuthNModule {

}
