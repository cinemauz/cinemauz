import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('room')
export class RoomEntity extends BaseEntity{

      @Column({ type: 'bigint',unique:true})
      name: number;

      @Column({ type: 'varchar'})
      location: string;

      @Column({ type: 'int',})
      total_seats: number;
}