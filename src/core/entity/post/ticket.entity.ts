import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('ticket')
export class TicketEntity extends BaseEntity{

      @Column({ type: 'decimal'})
      price: number;

      @Column({ type: 'int'})
      showtime_id: number;

      @Column({ type: 'boolean'})
      status: boolean;
}