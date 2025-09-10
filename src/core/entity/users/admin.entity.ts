import { BaseEntity } from 'src/common/database/base.entity';
import { Roles } from 'src/common/enum/Roles';
import { Column, Entity } from 'typeorm';

@Entity('admin')
export class AdminEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  hashed_password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.ADMIN })
  role: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'decimal', default: 0 })
  balance: number;
}
