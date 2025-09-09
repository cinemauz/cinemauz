import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
// import { Customer } from '../../customer/entities/cutomer.entity';
// import { Ticket } from '../../ticket/entities/ticket.entity';
// import { Payment } from '../../payment/entities/payment.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  customer_id: string;

  @Column({ type: 'decimal' })
  total_price: number;

  @Column({ type: 'boolean', default: false })
  status: boolean;

//   @ManyToOne(() => Customer, (customer) => customer.orders)
//   customer: Customer;

//   @OneToMany(() => Ticket, (ticket) => ticket.order)
//   tickets: Ticket[];

//   @OneToMany(() => Payment, (payment) => payment.order)
//   payments: Payment[];
}
