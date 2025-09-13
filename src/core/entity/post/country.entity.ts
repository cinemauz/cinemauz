import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('country')
export class CountryEntity extends BaseEntity {
  // -------------------- NAME --------------------
  @Column({ type: 'varchar', unique: true })
  name: string;
}
