import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { OrderEntity } from '../order/entities/order.entity';
// import { OrderService } from './order.service';
// import { OrderController } from './order.controller';
import { OrderEntity } from 'src/core/entity/post/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  // providers: [OrderService],
  // controllers: [OrderController],
})
export class OrderModule {}
