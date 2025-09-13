import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database/base.entity';
import { TicketEntity } from './ticket.entity';

@Entity('rooms')
export class RoomEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  location: string;

  @Column({ type: 'int' })
  total_seats: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => TicketEntity, (ticket) => ticket.room, {
    cascade: true,
  })
  tickets: TicketEntity[];
}
