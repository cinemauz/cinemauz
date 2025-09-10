import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('ticket')
export class TicketEntity extends BaseEntity{

      @Column({ type: 'bigint'})
      price: number;

      @Column({ type: 'bigint'})
      showtime_id: string;

      @Column({ type: 'boolean'})
      status: boolean;
}