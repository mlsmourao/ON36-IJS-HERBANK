import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevelopersModule } from './developers/developers.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountsModule } from './accounts/accounts.module';
import { ManagersModule } from './managers/managers.module';
import { CustomersModule } from './customers/customers.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CreditsModule } from './credits/credits.module';
import { SavingsAccountsModule } from './savings-accounts/savings-accounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Não utilizar em prod
    }),
    DevelopersModule, AccountsModule, ManagersModule, CustomersModule, TransactionsModule, CreditsModule, SavingsAccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
