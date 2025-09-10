import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/base.entity';
import { CustomerEntity } from 'src/core/entity/users/customer.entity';

@Entity('reviews')
export class Review extends BaseEntity {
  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'int', default: 5 })
  rating: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.id)
  customer: CustomerEntity;

  
}
