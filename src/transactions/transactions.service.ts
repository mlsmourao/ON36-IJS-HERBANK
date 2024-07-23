import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository } from 'typeorm';
import { Transactions } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private readonly repository: Repository<Transactions>
  ) {}

  create(dto: CreateTransactionDto) {
    const transactions = this.repository.create(dto);
    return this.repository.save(transactions);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateTransactionDto) {
    const transactions = await this.repository.findOneBy({ id });
    if(!transactions) return null;
    this.repository.merge(transactions, dto);
    return this.repository.save(transactions);
  }

  async remove(id: string) {
    const transactions = await this.repository.findOneBy({ id });
    if(!transactions) return null;
    return this.repository.remove(transactions);
  }
}
