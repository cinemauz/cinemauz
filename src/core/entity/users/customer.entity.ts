import { BaseEntity } from "src/common/database/base.entity";
import { Roles } from "src/common/enum/Roles";
import { Column, Entity } from "typeorm";

@Entity('customer')
export class CustomerEntity extends BaseEntity{
      @Column({ type: 'varchar' })
      name: string;
    
      @Column({ type: 'varchar', unique: true })
      email: string;
    
      @Column({ type: 'varchar' })
      hashed_password: string;
    
      @Column({ type: 'enum', enum: Roles, default: Roles.CUSTOMER })
      role: string;
    
      @Column({ type: 'boolean', default: true })
      is_active: boolean;

      @Column({ type: 'decimal', default:0})
      balance: number;
}