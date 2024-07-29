import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { CheckingAccountsService } from './checking-accounts.service';
import { CreateCheckingAccountDto } from './dto/create-checking-account.dto';
import { UpdateCheckingAccountDto } from './dto/update-checking-account.dto';

@Controller('checking_accounts')
export class CheckingAccountsController {
  constructor(private readonly checkingAccountsService: CheckingAccountsService) {}

  @Post()
  async create(@Body() createCheckingAccountDto: CreateCheckingAccountDto) {
    return this.checkingAccountsService.create(createCheckingAccountDto);
  }

  @Get()
  findAll() {
    return this.checkingAccountsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const checking_account = await this.checkingAccountsService.findOne(id);
    if (!checking_account) throw new NotFoundException(`CheckingAccount with ID ${id} not found`);
    return checking_account;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateCheckingAccountDto: UpdateCheckingAccountDto,
  ) {
    const checking_account = await this.checkingAccountsService.update(id, updateCheckingAccountDto);
    if (!checking_account) throw new NotFoundException(`CheckingAccount with ID ${id} not found`);
    return checking_account;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const checking_account = await this.checkingAccountsService.remove(id);
    if (!checking_account) throw new NotFoundException(`CheckingAccount with ID ${id} not found`);
  }
}
