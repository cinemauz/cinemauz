import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('showtime')
export class ShowtimeEntity extends BaseEntity{

      @Column({ type: 'bigint',})
      movie_id: number;

      @Column({ type: 'bigint',})
      stock_quantity: number;

      @Column({ type: 'int',})
      room_id: number;

      @Column({type:'timestamp'})
      start_time:Date

      @Column({type:'timestamp'})
      end_time:Date
}