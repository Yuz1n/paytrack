import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Account } from '../account/account.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, account => account.payments)
  account: Account;

  @Column('decimal')
  amount: number;

  @Column()
  date: Date;

  @Column()
  description: string;
}
