import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../room/entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(dto: CreateRoomDto): Promise<Room> {
    try {
      const room = this.roomRepository.create(dto);
      return await this.roomRepository.save(room);
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Room[]> {
    try {
      return await this.roomRepository.find({ relations: ['showtimes'] });
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string): Promise<Room> {
    try {
      const room = await this.roomRepository.findOne({
        where: { id },
        relations: ['showtimes'],
      });
      if (!room) throw new NotFoundException('Room not found');
      return room;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, dto: UpdateRoomDto): Promise<Room> {
    try {
      await this.roomRepository.update(id, dto);
      const updated = await this.roomRepository.findOne({ where: { id } });
      if (!updated) throw new NotFoundException('Room not found');
      return updated;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.roomRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Room not found');
      }
    } catch (err) {
      throw err;
    }
  }
}
