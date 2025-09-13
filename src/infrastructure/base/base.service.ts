import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import { IFindOption, ISuccessRes } from '../response/success.interface';
import { successRes } from '../response/succesRes';
import { NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

import { config } from 'src/config/env.config';

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

  // ============================ FIND BY ============================

  async findOneBY(options?: IFindOption<Entity>): Promise<ISuccessRes> {
    // find option
    const data = await this.baseRepo.find({
      select: options?.select || {},
      relations: options?.relations || [],
      where: options?.where,
    });

    // not found
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
    // find by id
    if (this.baseRepo.metadata.name == 'admin') {
      if (id == config.SUPERADMIN.ID) {
        throw new NotFoundException('You could not show Super Admin');
      }
    }

    // find one with option
    const data = await this.baseRepo.findOne({
      select: options?.select || {},
      relations: options?.relations || [],
      where: { id, ...(options?.where as Entity), is_deleted: false },
    });

    // not found
    if (!data) {
      throw new NotFoundException(
        `not found this id => ${id} on ${String(this.baseRepo.metadata.name).split('Entity')[0]}`,
      );
    }

    // return success
    return successRes(data);
  }

  // ============================ UPDATE ============================
  async update(id: number, dto: UpdateDto): Promise<ISuccessRes> {
    // check id
    await this.findOneById(id);

    // update
    await this.baseRepo.update(id, dto as QueryDeepPartialEntity<Entity>);

    // find again id
    const { data } = await this.findOneById(id);
    return successRes(data);
  }

  // ============================ DELETE ============================
  async remove(id: number): Promise<ISuccessRes> {
    // check id
    await this.findOneById(id);

    // delete
    await this.baseRepo.delete(id);

    // return success
    return successRes({});
  }
  // ============================ SOFT DELETE ============================

  async softDelete(id: number): Promise<ISuccessRes> {
    // check id
    await this.findOneById(id);

    // soft delete is is_deleted=true
    await this.baseRepo.update(id, {
      is_deleted: true,
    } as unknown as QueryDeepPartialEntity<Entity>);

    return successRes({});
  }
}
