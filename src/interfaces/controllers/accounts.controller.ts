import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { AccountsService } from 'src/application/services/accounts.service';
import { CreateAccountDto } from 'src/interfaces/dto/create-account.dto';
import { UpdateAccountDto } from 'src/interfaces/dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const account = await this.accountsService.findOne(id);
    if (!account) throw new NotFoundException(`Account with ID ${id} not found`);
    return account;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    const account = await this.accountsService.update(id, updateAccountDto);
    if (!account) throw new NotFoundException(`Account with ID ${id} not found`);
    return account;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const account = await this.accountsService.remove(id);
    if (!account) throw new NotFoundException(`Account with ID ${id} not found`);
  }
}
