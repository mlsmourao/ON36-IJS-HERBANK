import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCheckingAccountDto } from './dto/create-checking-account.dto';
import { UpdateCheckingAccountDto } from './dto/update-checking-account.dto';
import { Repository } from 'typeorm';
import { CheckingAccount } from './entities/checking-account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CheckingAccountsService {
  constructor(
    @InjectRepository(CheckingAccount)
    private readonly repository: Repository<CheckingAccount>
  ) {}

  async create(dto: CreateCheckingAccountDto) {
    try {
      console.log('Criando conta corrente com DTO:', dto);
  
      const newCheckingAccount = this.repository.create(dto);
  
      console.log('Nova conta corrente a ser salva:', newCheckingAccount);

      return await this.repository.save(newCheckingAccount);
    } catch (error) {
      console.error('Erro ao criar conta corrente:', error);
      throw new BadRequestException('Falha ao criar conta corrente');
    }
  }
  
  async findAll() {
    const checking_accounts = await this.repository.find();
    if (checking_accounts.length === 0) {
      throw new NotFoundException('No checking-accounts found');
    }
    return checking_accounts;
  }

  async findOne(id: number) {
    const checking_account = await this.repository.findOne({
      where: { id: id }
    });
    if (!checking_account) {
      throw new NotFoundException(`CheckingAccount with ID ${id} not found`);
    }
    return checking_account;
  }

  async update(id: number, dto: UpdateCheckingAccountDto) {
    const checking_account = await this.repository.findOne({
      where: { id: id }
    });
    if (!checking_account) {
      throw new NotFoundException(`CheckingAccount with ID ${id} not found`);
    }
    this.repository.merge(checking_account, dto);
    return this.repository.save(checking_account);
  }

  async remove(id: number) {
    const checking_account = await this.repository.findOne({
      where: { id: id }
    });
    if (!checking_account) {
      throw new NotFoundException(`CheckingAccount with ID ${id} not found`);
    }
    return this.repository.remove(checking_account);
  }
}
