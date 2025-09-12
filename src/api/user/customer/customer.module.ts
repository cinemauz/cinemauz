import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/core/entity/users/customer.entity';
import { TokenService } from 'src/infrastructure/token/Token';
import { CryptoService } from 'src/infrastructure/crypt/Crypto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { AuthService } from '../auth/auth.service';

@Module({
  imports:[TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService,TokenService,CryptoService,BaseService,AuthService],
  exports:[CustomerService]
})
export class CustomerModule {}
