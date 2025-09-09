import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { AdminEntity } from 'src/core/entity/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/infrastructure/crypt/Crypto';
import { TokenService } from 'src/infrastructure/token/Token';
import { Repository } from 'typeorm';
import { ISuccessRes } from 'src/infrastructure/response/success.interface';
import { OnModuleInit } from '@nestjs/common';
import { Roles } from 'src/common/enum/Roles';
import { config } from 'src/config/env.config';
import { successRes } from 'src/infrastructure/response/succesRes';
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
  // update(id: string, updateAdminDto: UpdateAdminDto) {
  //   return `This action updates a #${id} admin`;
  // }

}
