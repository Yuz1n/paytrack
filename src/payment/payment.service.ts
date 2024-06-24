import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { Account } from '../account/account.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AccountService } from '../account/account.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    @Inject(forwardRef(() => AccountService))
    private accountService: AccountService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const account = await this.accountsRepository.findOneBy({ id: createPaymentDto.accountId });
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.initialBalance < createPaymentDto.amount) {
      throw new BadRequestException('Insufficient balance');
    }

    const payment = new Payment();
    payment.account = account;
    payment.amount = createPaymentDto.amount;
    payment.date = new Date(createPaymentDto.date); // Converta a string para uma instância de Date
    payment.description = createPaymentDto.description;

    account.initialBalance -= createPaymentDto.amount;
    await this.accountsRepository.save(account);

    return this.paymentsRepository.save(payment);
  }

  findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({ relations: ['account'] });
  }

  findOne(id: number): Promise<Payment> {
    return this.paymentsRepository.findOne({ where: { id }, relations: ['account'] });
  }
}
