import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { GenreEntity } from 'src/core/entity/post/genre.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { successRes } from 'src/infrastructure/response/succesRes';

@Injectable()
export class GenreService extends BaseService<
  CreateGenreDto,
  UpdateGenreDto,
  GenreEntity
> {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreRepo: Repository<GenreEntity>,
  ) {
    super(genreRepo);
  }
  // ============================ CREATE GENRE ============================
  async createGenre(createGenreDto: CreateGenreDto) {
    const { name } = createGenreDto;

    // check exist name
    const existName = await this.genreRepo.findOne({ where: { name } });
    if (existName) {
      throw new ConflictException(
        `this name => ${name} alreaady exist on Genre`,
      );
    }

    // create
    return super.create(createGenreDto);
  }

  // ============================ CREATE GENRE ============================
  async updateGenre(id: number, updateGenreDto: UpdateGenreDto) {
    const { name } = updateGenreDto;

    // check exist name
    if (name) {
      const existName = await this.genreRepo.findOne({ where: { name } });
      if (existName) {
        throw new ConflictException(
          `this name => ${name} alreaady exist on Genre`,
        );
      }
    }

    // update
    return super.update(id, updateGenreDto);
  }
}
