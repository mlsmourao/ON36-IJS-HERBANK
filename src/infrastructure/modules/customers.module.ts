import { Module } from '@nestjs/common';
import { CustomersService } from 'src/application/services/customers/customers.service';
import { CustomersController } from 'src/interfaces/controllers/customers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/domain/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
