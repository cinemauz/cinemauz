import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenService } from 'src/infrastructure/token/Token';
import { RedisService } from 'src/infrastructure/redis/Redis';

@Module({
  providers: [AuthService, TokenService, RedisService],
  exports: [AuthService],
})
export class AuthModule {}
