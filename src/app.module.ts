import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account/account.entity';
import { Payment } from './payment/payment.entity';
import { AccountModule } from './account/account.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'paytrack',
      password: '123',
      database: 'paytrack',
      entities: [Account, Payment, User],
      synchronize: true,
    }),
    AccountModule,
    PaymentModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
