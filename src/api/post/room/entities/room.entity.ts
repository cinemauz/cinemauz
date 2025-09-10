import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Showtime } from '../../showtime/entities/showtime.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  location: string;

  @Column({ type: 'bigint' })
  total_seats: number;

//   @OneToMany(() => Showtime, (showtime) => showtime.room)
//   showtimes: Showtime[];
}
