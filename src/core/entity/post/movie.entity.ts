import { BaseEntity } from "src/common/database/base.entity";
import { Roles } from "src/common/enum/Roles";
import { languages } from "src/config/lang.config";
import { Column, Entity } from "typeorm";

@Entity('movie')
export class MovieEntity extends BaseEntity {
    
    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'bigint' })
    duration: number;

    @Column({ type: 'timestamp' })
    realase_date: Date

    @Column({ type: 'varchar' })
    image_url: string

    @Column({ type: 'enum', enum: languages, nullable: false })
    language: string

    @Column({ type: 'bigint' })
    genre_id: number

    @Column({ type: 'bigint' })
    admin_id: number

}