import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiOperation({ summary: 'Create new room' })
  create(@Body() dto: CreateRoomDto) {
    return this.roomService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  findAll() {
    return this.roomService.findAll({ relations: ['tickets'] });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get room by id' })
  findOne(@Param('id') id: number) {
    return this.roomService.findOneById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update room by id' })
  update(@Param('id') id: number, @Body() dto: UpdateRoomDto) {
    return this.roomService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete room by id' })
  remove(@Param('id') id: number) {
    return this.roomService.remove(id);
  }
}
