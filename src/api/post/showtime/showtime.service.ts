import { Injectable } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/infrastructure/base/base.service';
import { ShowtimeEntity } from 'src/core/entity/post/showtime.entity';
import { Repository } from 'typeorm';
import { MovieEntity } from 'src/core/entity/post/movie.entity';
import { RoomEntity } from 'src/core/entity/post/room.entity';

@Injectable()
export class ShowtimeService extends BaseService<
  CreateShowtimeDto,
  UpdateShowtimeDto,
  ShowtimeEntity
> {
  constructor(
    //showtime
    @InjectRepository(ShowtimeEntity)
    private readonly showtimeRepo: Repository<ShowtimeEntity>,

    // movie
    @InjectRepository(MovieEntity)
    private readonly movieRepo: Repository<MovieEntity>,

    // room
    @InjectRepository(RoomEntity)
    private readonly roomRepo: Repository<RoomEntity>,
  ) {
    super(showtimeRepo);
  }

  // ============================ CREATE SHOWTIME ============================

  async createShowtime(createShowtimeDto: CreateShowtimeDto) {
    // distructure
    const { movie_id, room_id } = createShowtimeDto;

    // check movie id
    await this.findByIdRepository(this.movieRepo, movie_id);

    // check customer id
    const { data }: any = await this.findByIdRepository(this.roomRepo, room_id);

    // create
    createShowtimeDto.seat_qantity = data.total_seats;
    return super.create(createShowtimeDto);
  }

  // ============================ UPDATE SHOWTIME ============================

  async updateShowtime(id: number, updateShowtimeDto: UpdateShowtimeDto) {
    // distructure
    const { movie_id, room_id } = updateShowtimeDto;

    // check movie id
    if (movie_id) {
      if (movie_id) {
        await this.findByIdRepository(this.movieRepo, movie_id);
      }
    }

    // check customer id
    if (room_id) {
      if (room_id) {
        await this.findByIdRepository(this.roomRepo, room_id);
      }
    }
    // update
    return super.update(id, updateShowtimeDto);
  }
}
