import { Module } from '@nestjs/common';
import { CustomersService } from 'src/application/services/customers/customers.service';
import { CustomersController } from 'src/interfaces/controllers/customers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/domain/entities/customer.entity';
import { HttpModule } from '@nestjs/axios';
import { CorreiosApiService } from 'src/infrastructure/apis/correios-api.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    HttpModule,
  ],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CorreiosApiService,
  ],
})
export class CustomersModule {}
