import { DeepPartial, FindOptionsWhere, ILike, ObjectLiteral, Repository } from 'typeorm';
import {
  IFindOption,
  ISuccessRes,
} from '../response/success.interface';
import { successRes } from '../response/succesRes';
import { NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';
import { toSkipTake } from '../pagination/skip-page';

export class BaseService<CreateDto, UpdateDto, Entity extends ObjectLiteral> {
  constructor(private readonly baseRepo: Repository<Entity>) { }

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
  async findAllWithPagination(query: string = '', limit: number = 10, page: number = 1) {
    const { take, skip } = toSkipTake(page, limit)
    const [user, count] = await this.baseRepo.findAndCount({
      // select:{
      //   name:true,
      // },
      where: {
        username: ILike(`%${query}%`),
        is_deleted:false
      } as unknown as FindOptionsWhere<Entity>,
      order: {
        // 'createdAt': 'DESC',
      },
      take,
      skip,
    })
    const total_page = Math.ceil(count / limit)
    return successRes({
      data: user,
      mete: {
        page,
        total_page,
        total_count: count,
        hasNextPage: total_page > page
      }
    })

  }


  // ============================ FIND BY ============================
  async findOneBY(options?: IFindOption<Entity>): Promise<ISuccessRes> {
    const data = await this.baseRepo.find({
      select: options?.select || {},
      relations: options?.relations || [],
      where: options?.where,
    });
    if (!data) {
      throw new NotFoundException(
        `not found on ${String(this.baseRepo.metadata.name).split('Entity')[0]}`,
      );
    }
    return successRes(data);
  }

  // ============================ FIND BY ID ============================
  async findOneById(
    id: number,
    options?: IFindOption<Entity>,
  ): Promise<ISuccessRes> {
    const data = await this.baseRepo.findOne({
      select: options?.select || {},
      relations: options?.relations || [],
      where: { id, ...(options?.where as Entity) },
    });
    if (!data) {
      throw new NotFoundException(
        `not found this id => ${id} on ${String(this.baseRepo.metadata.name).split('Entity')[0]}`,
      );
    }
    return successRes(data);
  }

  // ============================ UPDATE ============================
  async update(id: number, dto: UpdateDto): Promise<ISuccessRes> {
    await this.findOneById(id);
    await this.baseRepo.update(id, dto as QueryDeepPartialEntity<Entity>);
    const data = await this.baseRepo.findOne({ where: { id: id as any } });
    if (!data) {
      throw new NotFoundException(
        `not found this id => ${id} on ${this.baseRepo}`,
      );
    }
    return successRes(data);
  }

  // ============================ DELETE ============================
  async remove(id: number): Promise<ISuccessRes> {
    await this.findOneById(id);
    await this.baseRepo.delete(id);
    return successRes({});
  }
}
