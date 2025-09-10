import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import {
  IFindOption,
  IResponsePagination,
  ISuccessRes,
} from '../response/success.interface';
import { successRes } from '../response/succesRes';
import { HttpException, NotFoundException } from '@nestjs/common';
import { RepositoryPager } from '../pagination';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

export class BaseService<CreateDto, UpdateDto, Entity extends ObjectLiteral> {
  constructor(private readonly baseRepo: Repository<Entity>) {}

  get getRepository() {
    return this.baseRepo;
  }
  // ============================ CREATE ============================
  async create(dto: CreateDto): Promise<ISuccessRes> {
    const entity = this.baseRepo.create(dto as DeepPartial<Entity>);
    const data = this.baseRepo.save(entity);
    return successRes(entity);
  }

  // ============================ FIND ALL ============================
  async findAll(options?: IFindOption<Entity>): Promise<ISuccessRes> {
    const data = await this.baseRepo.find({ ...options });
    return successRes(data);
  }

  // ============================ FIND ALL PAGE ============================
  async findAllWithPagination(
    options?: IFindOption<Entity>,
  ): Promise<IResponsePagination> {
    return await RepositoryPager.findAll(this.getRepository, options);
  }

  // ============================ FIND BY ============================
  async findOneBY(options?: IFindOption<Entity>): Promise<ISuccessRes> {
    const data = await this.baseRepo.find({
      select: options?.select || {},
      relations: options?.relations || [],
      where: options?.where,
    });
    if (!data) {
      throw new NotFoundException(`not found `);
    }
    return successRes(data);
  }

  // ============================ FIND BY ID ============================
  async findOneById(
    id:number,
    options?: IFindOption<Entity>,
  ): Promise<ISuccessRes> {
    const data = await this.baseRepo.findOne({
      select: options?.select || {},
      relations: options?.relations || [],
      where: { id, ...(options?.where as Entity) },
    });
    if (!data) {
      throw new NotFoundException(`not found this id => ${id}`);
    }
    return successRes(data);
  }

  // ============================ UPDATE ============================
  async update(id:number, dto: UpdateDto): Promise<ISuccessRes> {
    await this.findOneById(id);
    await this.baseRepo.update(id, dto as QueryDeepPartialEntity<Entity>);
    const data = await this.baseRepo.findOne({ where: { id: id as any } });
    if (!data) {
      throw new NotFoundException(`not found this id => ${id}`);
    }
    return successRes(data);
  }

  // ============================ DELETE ============================
  async remove(id:number): Promise<ISuccessRes> {
    await this.findOneById(id);
    await this.baseRepo.delete(id);
    return successRes({});
  }
}
