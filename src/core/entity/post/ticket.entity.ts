import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/database/base.entity';
import { RoomEntity } from './room.entity';
import { OrderEntity } from './order.entity';

@Entity('tickets')
export class TicketEntity extends BaseEntity {
  @Column()
  seat_number: string;

  @ManyToOne(() => RoomEntity, (room) => room.tickets)
  @JoinColumn({ name: 'room_id' })
  room: RoomEntity;

  @OneToMany(() => OrderEntity, (order) => order.ticket)
  orders: OrderEntity[];
}
