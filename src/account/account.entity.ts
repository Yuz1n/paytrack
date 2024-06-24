import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Payment } from '../payment/payment.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  accountType: string;

  @Column('decimal')
  initialBalance: number;

  @OneToMany(() => Payment, payment => payment.account)
  payments: Payment[];
}
