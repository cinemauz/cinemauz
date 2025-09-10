import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('review')
export class ReviewEntity extends BaseEntity {
    
    @Column({ type: 'text' })
    comment: string

    @Column({ type: 'int' })
    rating: number

    @Column({ type: 'varchar' })
    customer_id: string;

    @Column({ type: 'varchar' })
    movie_id: string;
}