import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { CustomerEntity } from 'src/core/entity/users/customer.entity';
import { ISuccessRes } from 'src/infrastructure/response/success.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoService } from 'src/infrastructure/crypt/Crypto';
import { TokenService } from 'src/infrastructure/token/Token';
import { successRes } from 'src/infrastructure/response/succesRes';
import { IToken } from 'src/infrastructure/token/token.interface';
import { Roles } from 'src/common/enum/Roles';
import { SignInCustomer } from './dto/sign-in.dt';
import { Response } from 'express';
import { TelegramService } from 'src/infrastructure/telegram/send-otp';
import { generateOTP } from 'src/infrastructure/generator-otp/generator-otp';
import { config } from 'src/config/env.config';
import { EmailWithOtp } from './dto/with-email.dt';
import { RedisService } from 'src/infrastructure/redis/Redis';

@Injectable()
export class CustomerService extends BaseService<CreateCustomerDto, UpdateCustomerDto, CustomerEntity> {

  // ================================ CONSTRUCTOR ================================

  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepo: Repository<CustomerEntity>,

    private readonly crypto: CryptoService,
    private readonly tokenService: TokenService,
    private readonly bot: TelegramService,
    private readonly redis:RedisService
  ) {
    super(customerRepo);
  }

  // ================================ CREATE CUSTOMER ================================

  async createCustomer(createCustomerDto: CreateCustomerDto):Promise<ISuccessRes>{

    // destructure
    const { email, password, ...rest } = createCustomerDto;

    // check email
    const existEmail = await this.customerRepo.findOne({ where: { email } });
    if (existEmail) {
      throw new ConflictException(
        `this user => ${email} is already exist on Customer`,
      );
    }

    // enrypt password
    const hashed_password = await this.crypto.encrypt(password);

    // generate otp
    const otp = generateOTP(config.OTP.NUMBER)

    // save Customer
    const data = ({ ...rest, email, hashed_password, otp });

    // send telegram otp
    await this.bot.sendCode(otp)

    // save JSON format
    const result=JSON.stringify(data)

    // save redis
    await this.redis.setRedis(email,result)

    // return success
    return successRes({ email });
  }

  // ================================ REGSTRATION CUSTOMER ================================

  async registrationOtp(emailWithOtp: EmailWithOtp){

    // distructur
    const { email, otp } = emailWithOtp

    // search email
    const existEmail = await this.customerRepo.findOne({ where: { email } })
    if (existEmail) {
      throw new ConflictException(`this is email => ${email} already exist on Customer`)
    }

    // confirm otp    
    const redisFind=await this.redis.getRedis(email)
    if(!redisFind){
      throw new BadRequestException('Email is invalid')
    }
    const user=JSON.parse(redisFind)  

    // invalid otp is error
    if (Number(user.otp) != otp) {
      throw new BadRequestException('OTP is invalid')
    }

    // delete otp in  cache
    await this.redis.delRedis(email)

    // delete otp on data
    delete user.otp
    const data = this.customerRepo.create(user)

    // save customer
    const result=await this.customerRepo.save(user)
    return successRes(result)
  }
  // ================================ UPDATE CUSTOMER ================================

  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto, user: IToken) {

    // check Customer
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`not found this id => ${id} on Customer`)
    }

    // check username
    const { email, password, is_active } = updateCustomerDto
    if (email) {
      const existName = await this.customerRepo.findOne({ where: { email } })
      if (existName && existName.id != id) {
        throw new ConflictException(`This username => ${email} already exist`)
      }
    }

    // check Super Admin or Admin Role
    let hashed_password = customer.hashed_password
    let active = customer.is_active
    if (user.role == Roles.SUPERADMIN || user.role == Roles.ADMIN) {

      // check password
      if (password) {
        hashed_password = await this.crypto.encrypt(password)
      }
      // check is active
      if (is_active != null) {
        active = is_active
      }
    }

    // update Customer
    await this.customerRepo.update({ id }, { email, hashed_password, is_active: active })
    return await this.findOneById(id);
  }

  // ================================ SIGN IN ================================

  async signIn(signInDto: SignInCustomer, res: Response) {
    const { email, password } = signInDto;

    // check email
    const customer = await this.customerRepo.findOne({ where: { email } });
    if (!customer) {
      throw new UnauthorizedException('Email or Password is incorect');
    }

    // check password
    const checkPass = await this.crypto.decrypt(
      password,
      customer?.hashed_password as string,
    );

    if (!customer || !checkPass) {
      throw new UnauthorizedException('Username or Password is incorect');
    }

    // give payload
    const payload: IToken = {
      id: Number(customer.id),
      is_active: customer.is_active,
      role: customer.role,
    };

    // access token
    const accessToken = await this.tokenService.accessToken(payload);

    // refresh token
    const refreshToken = await this.tokenService.refreshToken(payload);

    // write cookie
    await this.tokenService.writeCookie(res, 'CustomerToken', refreshToken, 15);

    return successRes({ token: accessToken });
  }

}