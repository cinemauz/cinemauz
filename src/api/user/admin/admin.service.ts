import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { AdminEntity } from 'src/core/entity/users/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/infrastructure/crypt/Crypto';
import { TokenService } from 'src/infrastructure/token/Token';
import { Repository } from 'typeorm';
import { ISuccessRes } from 'src/infrastructure/response/success.interface';
import { OnModuleInit } from '@nestjs/common';
import { Roles } from 'src/common/enum/Roles';
import { config } from 'src/config/env.config';
import { successRes } from 'src/infrastructure/response/succesRes';
import { Response } from 'express';
import { IToken } from 'src/infrastructure/token/token.interface';
import { SignInAdminDto } from './dto/sign-in.dto';
@Injectable()
export class AdminService
  extends BaseService<CreateAdminDto, UpdateAdminDto, AdminEntity>
  implements OnModuleInit
{
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepo: Repository<AdminEntity>,
    private readonly crypto: CryptoService,
    private readonly tokenService: TokenService,
  ) {
    super(adminRepo);
  }
  // ================================ ON MODULE INIT ================================
  async onModuleInit(): Promise<void> {
    try {
      const exist = await this.adminRepo.findOne({
        where: { role: Roles.SUPERADMIN },
      });
      if (!exist) {
        const hashed_password = await this.crypto.encrypt(
          config.SUPERADMIN.PASSWORD,
        );
        const superAdmin = this.adminRepo.create({
          name: config.SUPERADMIN.NAME,
          username: config.SUPERADMIN.USERNAME,
          hashed_password,
          role: Roles.SUPERADMIN,
        });
        await this.adminRepo.save(superAdmin);
        console.log(`${Roles.SUPERADMIN} is created`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Error on created super admin');
    }
  }
  // ================================ CREATE ADMIN ================================
  async createAdmin(createAdminDto: CreateAdminDto): Promise<ISuccessRes> {
    const { username, password, ...rest } = createAdminDto;
    const existName = await this.adminRepo.findOne({ where: { username } });
    if (existName) {
      throw new ConflictException(
        `this user => ${username} already exist on Admin`,
      );
    }
    const hashed_password = await this.crypto.encrypt(password);
    const data = this.adminRepo.create({ ...rest, username, hashed_password });
    await this.adminRepo.save(data);
    return successRes(data);
  }
  // ================================ UPDATE ADMIN ================================
  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto, req?: Request) {
    // console.log(req.user);

    if (id == 1) {
      throw new ConflictException(`You cant update this ${id} on Admin`);
    }
    const admin = await this.adminRepo.findOne({ where: { id } });

    const { username, password, is_active, ...rest } = updateAdminDto;
    if (username) {
      const user = await this.adminRepo.findOne({ where: { username } });
      if (user) {
        throw new ConflictException(
          `${username} already exist on ${String(this.adminRepo.metadata.name).split('Entity')[0]}`,
        );
      }
    }
    if (password) {
    }
    const data = await this.adminRepo.update(id, updateAdminDto);
    return successRes(data);
  }

  // ================================ SIGN IN ================================

  async signIn(signInDto: SignInAdminDto, res: Response) {
    const { username, password } = signInDto;

    const admin = await this.adminRepo.findOne({ where: { username } });
    if (!admin) {
      throw new UnauthorizedException('Username or Password is incorect');
    }

    const checkPass = await this.crypto.decrypt(
      password,
      admin?.hashed_password as string,
    );

    if (!admin || !checkPass) {
      throw new UnauthorizedException('Username or Password is incorect');
    }

    const payload: IToken = {
      id: admin.id,
      is_active: admin.is_active,
      role: admin.role,
    };
    const accessToken = await this.tokenService.accessToken(payload);
    const refreshToken = await this.tokenService.refreshToken(payload);
    await this.tokenService.writeCookie(res, 'adminToken', refreshToken, 15);
    return successRes({ token: accessToken });
  }
}
