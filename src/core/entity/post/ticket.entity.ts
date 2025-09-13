import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/database/base.entity';
import { RoomEntity } from './room.entity';
import { OrderEntity } from './order.entity';

@Entity('ticket')
export class TicketEntity extends BaseEntity {
  @Column()
  seat_number: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  showtime_id: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(() => OrderEntity, (order) => order.ticket, {
    cascade: true,
  })
  orders: OrderEntity[];
}
