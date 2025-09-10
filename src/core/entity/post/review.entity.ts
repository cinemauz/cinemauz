import { BaseEntity } from "src/common/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('review')
export class ReviewEntity extends BaseEntity {
    
    @Column({ type: 'text' })
    comment: string

    @Column({ type: 'int' })
    rating: number

    @Column({ type: 'int' })
    customer_id: number;

    @Column({ type: 'int' })
    movie_id: number;
}