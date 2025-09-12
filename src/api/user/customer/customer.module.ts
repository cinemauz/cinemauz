import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/core/entity/users/customer.entity';
import { TokenService } from 'src/infrastructure/token/Token';
import { CryptoService } from 'src/infrastructure/crypt/Crypto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { AuthService } from '../auth/auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { TelegramService } from 'src/infrastructure/telegram/send-otp';
import { RedisService } from 'src/infrastructure/redis/Redis';
import { EmailService } from 'src/infrastructure/email/Email-OTP';

@Module({
  imports:[TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService,EmailService,TokenService,CryptoService,BaseService,AuthService,TelegramService,RedisService],
  exports:[CustomerService]
})
export class CustomerModule {}
