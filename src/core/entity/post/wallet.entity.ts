import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('wallet')
export class WalletEntity extends BaseEntity {
  // --------------------- CARD NAME ---------------------
  @Column({ type: 'varchar' })
  card_name: string;

  // --------------------- CARD NUMBER ---------------------

  @Column({ type: 'int', unique: true })
  card_number: number;

  // --------------------- CARD BALANCE ---------------------

  @Column({ type: 'decimal' })
  balance: number;

  // --------------------- CUSTOMER ID ---------------------

  @Column({ type: 'int' })
  customer_id: number;
}
