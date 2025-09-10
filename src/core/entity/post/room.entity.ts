import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('room')
export class RoomEntity extends BaseEntity{

      @Column({ type: 'varchar',unique:true})
      name: string;

      @Column({ type: 'varchar'})
      location: string;

      @Column({ type: 'int',})
      total_seats: number;

      @Column({ type: 'boolean',default:false})
      is_active: boolean;
}