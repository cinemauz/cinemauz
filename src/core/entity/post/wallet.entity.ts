import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('wallet')
export class WalletEntity extends BaseEntity{

      @Column({ type: 'varchar'})
      card_name: string;

      @Column({ type: 'bigint'})
      card_number: number;

      @Column({ type: 'bigint'})
      balance: number;

      @Column({ type: 'bigint'})
      customer_id: number;
}