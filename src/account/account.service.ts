import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { Payment } from '../payment/payment.entity';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @Inject(forwardRef(() => PaymentService))
    private paymentService: PaymentService,
  ) {}

  create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = new Account();
    account.name = createAccountDto.name;
    account.accountType = createAccountDto.accountType;
    account.initialBalance = createAccountDto.initialBalance;

    return this.accountsRepository.save(account);
  }

  findAll(): Promise<Account[]> {
    return this.accountsRepository.find();
  }

  findOne(id: number): Promise<Account> {
    return this.accountsRepository.findOneBy({ id });
  }

  async getTransactions(accountId: number, startDate: Date, endDate: Date) {
    const account = await this.accountsRepository.findOneBy({ id: accountId });
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const transactions = await this.paymentsRepository.find({
      where: {
        account: { id: accountId },
        date: Between(startDate, endDate),
      },
    });

    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    return {
      transactions,
      total,
    };
  }
}
