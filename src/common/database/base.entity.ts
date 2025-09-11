import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  // ----------------- ID -----------------
  @PrimaryGeneratedColumn()
  id: number;

  // ----------------- CREATED AT -----------------
  @CreateDateColumn()
  createdAt: Date;

  // ----------------- UPDATE AT -----------------
  @UpdateDateColumn()
  updatedAt: Date;
}
