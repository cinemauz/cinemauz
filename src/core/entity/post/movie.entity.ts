import { BaseEntity } from 'src/common/database/base.entity';
import { Languages } from 'src/common/enum/lang';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AdminEntity } from '../users/admin.entity';
import { GenreEntity } from './genre.entity';
import { CountryEntity } from './country.entity';
import { ReviewEntity } from './review.entity';

@Entity('movie')
export class MovieEntity extends BaseEntity {
  // ---------------------------- ADMIN ----------------------------

  @Column({ type: 'varchar', unique: true })
  title: string;

  // ---------------------------- DESCRIPTION ----------------------------

  @Column({ type: 'text', nullable: true })
  description: string;

  // ---------------------------- DURATION ----------------------------

  @Column({ type: 'varchar' })
  duration: string;

  // ---------------------------- RELEASE DATE ----------------------------

  @Column({ type: 'varchar', nullable: true })
  realase_date: string;

  // ---------------------------- IMAGE URL ----------------------------

  @Column({ type: 'varchar' })
  image_url: string;

  // ---------------------------- VIDEO URL ----------------------------

  @Column({ type: 'varchar' })
  video_url: string;

  // ---------------------------- LANGUAGES ----------------------------

  @Column({ type: 'enum', enum: Languages, nullable: true })
  language: string;

  // ---------------------------- COUNTRY ID ----------------------------

  @Column({ type: 'int' })
  country_id: string;

  // ---------------------------- GENRE ID ----------------------------

  @Column({ type: 'int' })
  genre_id: number;
  // ---------------------------- ADMIN ID ----------------------------

  @Column({ type: 'int' })
  admin_id: number;

  // ---------------------------- ADMIN ID ----------------------------

  @ManyToOne(() => AdminEntity, (admin) => admin.movies, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'admin_id' })
  admin: AdminEntity;

  // ---------------------------- GENRE ID ----------------------------

  @ManyToOne(() => GenreEntity, (genre) => genre.movies, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'genre_id' })
  genre: GenreEntity;

  // ---------------------------- COUNNTRY ID----------------------------

  @ManyToOne(() => CountryEntity, (admin) => admin.movies, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  // ---------------------------- REVIEWS ----------------------------

  @OneToMany(() => ReviewEntity, (review) => review.movie, {
    cascade: true,
  })
  reviews: ReviewEntity[];
}
