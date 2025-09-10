import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from 'src/core/entity/post/room.entity';
import { BaseService } from 'src/infrastructure/base/base.service';

@Injectable()
export class RoomService extends BaseService<CreateRoomDto,UpdateRoomDto,RoomEntity>{
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {super(roomRepository)}

  
}
