import { Module } from '@nestjs/common';
import { AppController } from 'src/interfaces/controllers/app.controller';
import { AppService } from 'src/application/services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountsModule } from 'src/infrastructure/modules/accounts.module';
import { ManagersModule } from 'src/infrastructure/modules/managers.module';
import { CustomersModule } from 'src/infrastructure/modules/customers.module';
import { TransactionsModule } from 'src/infrastructure/modules/transactions.module';
import { CreditsModule } from 'src/infrastructure/modules/credits.module';
import { SavingsAccountsModule } from 'src/infrastructure/modules/savings-accounts.module';
import { CheckingAccountsModule } from 'src/infrastructure/modules/checking-accounts.module';
import { CreditCardsModule } from 'src/infrastructure/modules/credit-cards.module';
import { LoansModule } from 'src/infrastructure/modules/loans.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-sa-east-1.pooler.supabase.com',
      port: 6543,
      username:'postgres.clfcpzvnclgiomjrrrfi',
      password:'Matheus@298439',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
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
