import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/database/base.entity';
import { CustomerEntity } from 'src/core/entity/users/customer.entity';
import { MovieEntity } from 'src/core/entity/post/movie.entity';

@Entity('reviews')
export class ReviewEntity extends BaseEntity {
  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'int', default: 5 })
  rating: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.id, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.id, { eager: true })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;
}
