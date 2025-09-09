import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    try {
      const order = this.orderRepository.create(dto);
      return await this.orderRepository.save(order);
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.orderRepository.find({
        relations: ['customer', 'tickets', 'payments'],
      });
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['customer', 'tickets', 'payments'],
      });
      if (!order) throw new NotFoundException('Order not found');
      return order;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, dto: UpdateOrderDto): Promise<Order> {
    try {
      await this.orderRepository.update(id, dto);
      const updated = await this.orderRepository.findOne({ where: { id } });
      if (!updated) throw new NotFoundException('Order not found');
      return updated;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.orderRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Order not found');
      }
    } catch (err) {
      throw err;
    }
  }
}
