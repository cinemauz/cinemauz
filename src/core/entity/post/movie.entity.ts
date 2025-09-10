import { BaseEntity } from 'src/common/database/base.entity';
import { Country } from 'src/common/enum/country';
import { Languages } from 'src/common/enum/lang';
import { Column, Entity } from 'typeorm';

@Entity('movie')
export class MovieEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  duration: Date;

  @Column({ type: 'timestamp', nullable: true })
  realase_date: Date;

  @Column({ type: 'varchar' })
  image_url: string;

  @Column({ type: 'varchar' })
  video_url: string;

  @Column({ type: 'enum', enum: Languages, nullable: true })
  language: string;

  @Column({ type: 'enum', enum: Country, nullable: true })
  country: string;

  @Column({ type: 'int' })
  genre_id: number;

  @Column({ type: 'int' })
  admin_id: number;
}
