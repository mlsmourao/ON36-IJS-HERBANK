import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from 'src/interfaces/dto/accounts/create-account.dto';
import { UpdateAccountDto } from 'src/interfaces/dto/accounts/update-account.dto';
import { Repository } from 'typeorm';
import { Account } from 'src/domain/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly repository: Repository<Account>
  ) {}

  async create(dto: CreateAccountDto) {
    try {
      console.log('Criando conta com DTO:', dto);
  
      const newAccount = this.repository.create(dto);
  
      console.log('Nova conta a ser salva:', newAccount);

      return await this.repository.save(newAccount);
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      throw new BadRequestException('Falha ao criar conta');
    }
  }
  
  async findAll() {
    const accounts = await this.repository.find();
    if (accounts.length === 0) {
      throw new NotFoundException('No accounts found');
    }
    return accounts;
  }

  async findOne(id: number) {
    const account = await this.repository.findOne({
      where: { id: id }
    });
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  async update(id: number, dto: UpdateAccountDto) {
    const account = await this.repository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return await this.repository.save({ ...account, ...dto });
  } 

  async remove(id: number) {
    const account = await this.repository.findOne({
      where: { id: id }
    });
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return this.repository.remove(account);
  }
}
