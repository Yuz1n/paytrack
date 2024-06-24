import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PaymentModule } from '../payment/payment.module';
import { Payment } from '../payment/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Payment]),
    forwardRef(() => PaymentModule),
  ],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [TypeOrmModule, AccountService],
})
export class AccountModule {}
