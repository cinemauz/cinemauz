// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Order } from '../order/entities/order.entity';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
// import { BaseService } from 'src/core/base/base.service';

// @Injectable()
// export class OrderService extends BaseService<CreateOrderDto, UpdateOrderDto, Order> {
//   constructor(
//     @InjectRepository(Order)
//     private readonly orderRepository: Repository<Order>,
//   ) {
//     // BaseService ichiga repository ni uzatamiz
//     super(orderRepository);
//   }

//   // ❗ Agar qo‘shimcha faqat orderga xos metodlar kerak bo‘lsa shu yerda yozasiz
//   // masalan "findByCustomerId"
//   async findByCustomer(customerId: string) {
//     return this.getRepository.find({
//       where: { customer: { id: customerId } },
//       relations: ['customer', 'tickets', 'payments'],
//     });
//   }
// }
