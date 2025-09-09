import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports:[TypeOrmModule.forFeature([AdminE])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
