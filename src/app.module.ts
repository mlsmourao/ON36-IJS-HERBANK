import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountsModule } from './controllers/accounts/accounts.module';
import { ManagersModule } from './controllers/managers/managers.module';
import { CustomersModule } from './controllers/customers/customers.module';
import { TransactionsModule } from './controllers/transactions/transactions.module';
import { CreditsModule } from './controllers/credits/credits.module';
import { SavingsAccountsModule } from './controllers/savings-accounts/savings-accounts.module';
import { CheckingAccountsModule } from './controllers/checking-accounts/checking-accounts.module';
import { CreditCardsModule } from './controllers/credit-cards/credit-cards.module';
import { LoansModule } from './controllers/loans/loans.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Não utilizar em prod
    }), 
    AccountsModule, 
    ManagersModule, 
    CustomersModule, 
    TransactionsModule, 
    CreditsModule, 
    SavingsAccountsModule,
    CheckingAccountsModule,
    CreditCardsModule,
    LoansModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
