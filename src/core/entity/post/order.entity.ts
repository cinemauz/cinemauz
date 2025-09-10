import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('order')
export class OrderEntity extends BaseEntity{

      @Column({ type: 'decimal'})
      total_price: number;

      @Column({ type: 'int'})
      quantity: number;

      @Column({ type: 'int'})
      customer_id: number;

      @Column({ type: 'int'})
      ticket_id: number;

      @Column({ type: 'boolean',default:false})
      status: boolean;
}