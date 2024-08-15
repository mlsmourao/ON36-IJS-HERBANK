import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { SavingsAccountsService } from 'src/application/services/savings-accounts/savings-accounts.service';
import { CreateSavingsAccountDto } from 'src/interfaces/dto/savings-accounts/create-savings-account.dto';
import { UpdateSavingsAccountDto } from 'src/interfaces/dto/savings-accounts/update-savings-account.dto';

@Controller('savings_accounts')
export class SavingsAccountsController {
  constructor(private readonly savingsAccountsService: SavingsAccountsService) {}

  @Post()
  async create(@Body() createSavingsAccountDto: CreateSavingsAccountDto) {
    return this.savingsAccountsService.create(createSavingsAccountDto);
  }

  @Get()
  findAll() {
    return this.savingsAccountsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const savings_account = await this.savingsAccountsService.findOne(id);
    if (!savings_account) throw new NotFoundException(`SavingsAccount with ID ${id} not found`);
    return savings_account;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateSavingsAccountDto: UpdateSavingsAccountDto,
  ) {
    const savings_account = await this.savingsAccountsService.update(id, updateSavingsAccountDto);
    if (!savings_account) throw new NotFoundException(`SavingsAccount with ID ${id} not found`);
    return savings_account;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const savings_account = await this.savingsAccountsService.remove(id);
    if (!savings_account) throw new NotFoundException(`SavingsAccount with ID ${id} not found`);
  }
}
