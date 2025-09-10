import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('payment')
export class PaymentEntity extends BaseEntity {
    
    @Column({ type: 'bigint' })
    total_price: number

    @Column({ type: 'boolean' })
    status: boolean

    @Column({ type: 'varchar' })
    customer: string;

    @Column({ type: 'varchar' })
    order_id: string;
}