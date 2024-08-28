import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from 'src/interfaces/dto/transactions/create-transaction.dto';
import { UpdateTransactionDto } from 'src/interfaces/dto/transactions/update-transaction.dto';
import { Repository } from 'typeorm';
import { Transactions } from 'src/domain/entities/transaction.entity';
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

  async findAll() {
    const transaction = await this.repository.find();
    return transaction;
  }

  async findOne(id: string) {
    const transaction = await this.repository.findOne({
      where: { id: id }
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async update(id: string, dto: UpdateTransactionDto) {
    const transactions = await this.repository.findOne({
      where: { id: id }
    });
    if (!transactions) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }
    this.repository.merge(transactions, dto);
    return this.repository.save(transactions);
  }

  async remove(id: string) {
    const transactions = await this.repository.findOne({
      where: { id: id }
    });
    if(!transactions) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }
    return this.repository.remove(transactions);
  }
}
