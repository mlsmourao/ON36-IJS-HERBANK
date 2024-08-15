import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCreditDto } from 'src/interfaces/dto/credits/create-credit.dto';
import { UpdateCreditDto } from 'src/interfaces/dto/credits/update-credit.dto';
import { Repository } from 'typeorm';
import { Credit } from 'src/domain/entities/credit.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(Credit)
    private readonly repository: Repository<Credit>
  ) {}

  async create(dto: CreateCreditDto) {
    try {
      console.log('Criando credito com DTO:', dto);
  
      const newCredit = this.repository.create(dto);
  
      console.log('Novo credito a ser salvo:', newCredit);

      return await this.repository.save(newCredit);
    } catch (error) {
      console.error('Erro ao criar credito:', error);
      throw new BadRequestException('Falha ao criar credito');
    }
  }
  
  async findAll() {
    const credits = await this.repository.find();
    return credits;
  }

  async findOne(id: number) {
    const credit = await this.repository.findOne({
      where: { id: id }
    });
    if (!credit) {
      throw new NotFoundException(`Credit with ID ${id} not found`);
    }
    return credit;
  }

  async update(id: number, dto: UpdateCreditDto) {
    const credit = await this.repository.findOne({
      where: { id: id }
    });
    if (!credit) {
      throw new NotFoundException(`Credit with ID ${id} not found`);
    }
    this.repository.merge(credit, dto);
    return this.repository.save(credit);
  }

  async remove(id: number) {
    const credit = await this.repository.findOne({
      where: { id: id }
    });
    if (!credit) {
      throw new NotFoundException(`Credit with ID ${id} not found`);
    }
    return this.repository.remove(credit);
  }
}
