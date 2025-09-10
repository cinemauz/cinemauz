import { Module } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { ShowtimeController } from './showtime.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowtimeEntity } from 'src/core/entity/post/showtime.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ShowtimeEntity])],
  controllers: [ShowtimeController],
  providers: [ShowtimeService],
  exports:[ShowtimeService]
})
export class ShowtimeModule {}
