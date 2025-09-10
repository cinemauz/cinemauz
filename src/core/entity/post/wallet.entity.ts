import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('wallet')
export class WalletEntity extends BaseEntity{

      @Column({ type: 'varchar'})
      card_name: string;

      @Column({ type: 'int'})
      card_number: number;

      @Column({ type: 'decimal'})
      balance: number;

      @Column({ type: 'int'})
      customer_id: number;
}