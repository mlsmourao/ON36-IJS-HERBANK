import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from 'src/interfaces/dto/create-loan.dto';
import { UpdateLoanDto } from 'src/interfaces/dto/update-loan.dto';
import { Repository } from 'typeorm';
import { Loan } from 'src/domain/entities/loan.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly repository: Repository<Loan>
  ) {}

  async create(dto: CreateLoanDto) {
    try {
      console.log('Criando empréstimo com DTO:', dto);
  
      const newLoan = this.repository.create(dto);
  
      console.log('Novo empréstimo a ser salvo:', newLoan);

      return await this.repository.save(newLoan);
    } catch (error) {
      console.error('Erro ao criar empréstimo:', error);
      throw new BadRequestException('Falha ao criar empréstimo');
    }
  }
  
  async findAll() {
    const loans = await this.repository.find();
    return loans;
  }

  async findOne(id: number) {
    const loan = await this.repository.findOne({
      where: { id: id }
    });
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }
    return loan;
  }

  async update(id: number, dto: UpdateLoanDto) {
    const loan = await this.repository.findOne({
      where: { id: id }
    });
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }
    this.repository.merge(loan, dto);
    return this.repository.save(loan);
  }

  async remove(id: number) {
    const loan = await this.repository.findOne({
      where: { id: id }
    });
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }
    return this.repository.remove(loan);
  }
}
