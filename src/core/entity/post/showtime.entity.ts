import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('showtime')
export class ShowtimeEntity extends BaseEntity{

      @Column({ type: 'int',})
      movie_id: number;

      @Column({ type: 'int',})
      stock_quantity: number;

      @Column({ type: 'int',})
      room_id: number;

      @Column({type:'timestamp'})
      start_time:Date

      @Column({type:'timestamp'})
      end_time:Date

      @Column({ type: 'boolean',default:true})
      is_active: boolean;
}