import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('genre')
export class GenreEntity extends BaseEntity{
      @Column({ type: 'varchar',unique:true })
      name: string;
}