import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowtimeEntity } from 'src/core/entity/post/showtime.entity';
import { BaseService } from 'src/infrastructure/base/base.service.js';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';

@Injectable()
export class ShowtimeService extends BaseService<
  CreateShowtimeDto,
  UpdateShowtimeDto,
  ShowtimeEntity
> {
  constructor(
    @InjectRepository(ShowtimeEntity)
    private readonly showtimeRepo: Repository<ShowtimeEntity>,
  ) {
    super(showtimeRepo);
  }
}
