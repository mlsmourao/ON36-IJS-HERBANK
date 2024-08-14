import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { TransactionsService } from 'src/application/services/transactions.service';
import { CreateTransactionDto } from 'src/interfaces/dto/create-transaction.dto';
import { UpdateTransactionDto } from 'src/interfaces/dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transaction = await this.transactionsService.findOne(id);
    if (!transaction) throw new NotFoundException();
    return transaction;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.transactionsService.update(id, updateTransactionDto);
    if (!transaction) throw new NotFoundException();
    return transaction;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const transaction = await this.transactionsService.remove(id);
    if (!transaction) throw new NotFoundException();
  }
}
