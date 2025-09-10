import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('order')
export class OrderEntity extends BaseEntity{

      @Column({ type: 'bigint'})
      total_price: number;

      @Column({ type: 'bigint'})
      quantity: number;

      @Column({ type: 'bigint'})
      customer_id: number;

      @Column({ type: 'bigint'})
      ticket_id: number;

      @Column({ type: 'boolean'})
      status: boolean;
}