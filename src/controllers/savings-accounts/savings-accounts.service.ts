import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateSavingsAccountDto } from './dto/create-savings-account.dto';
import { UpdateSavingsAccountDto } from './dto/update-savings-account.dto';
import { Repository } from 'typeorm';
import { SavingsAccount } from './entities/savings-account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SavingsAccountsService {
  constructor(
    @InjectRepository(SavingsAccount)
    private readonly repository: Repository<SavingsAccount>
  ) {}

  async create(dto: CreateSavingsAccountDto) {
    try {
      console.log('Criando conta poupança com DTO:', dto);
  
      const newSavingsAccount = this.repository.create(dto);
  
      console.log('Nova conta poupança a ser salva:', newSavingsAccount);

      return await this.repository.save(newSavingsAccount);
    } catch (error) {
      console.error('Erro ao criar conta poupança:', error);
      throw new BadRequestException('Falha ao criar conta poupança');
    }
  }
  
  async findAll() {
    const savings_accounts = await this.repository.find();
    return savings_accounts;
  }

  async findOne(id: number) {
    const savings_account = await this.repository.findOne({
      where: { id: id }
    });
    if (!savings_account) {
      throw new NotFoundException(`SavingsAccount with ID ${id} not found`);
    }
    return savings_account;
  }

  async update(id: number, dto: UpdateSavingsAccountDto) {
    const savings_account = await this.repository.findOne({
      where: { id: id }
    });
    if (!savings_account) {
      throw new NotFoundException(`SavingsAccount with ID ${id} not found`);
    }
    this.repository.merge(savings_account, dto);
    return this.repository.save(savings_account);
  }

  async remove(id: number) {
    const savings_account = await this.repository.findOne({
      where: { id: id }
    });
    if (!savings_account) {
      throw new NotFoundException(`SavingsAccount with ID ${id} not found`);
    }
    return this.repository.remove(savings_account);
  }
}
