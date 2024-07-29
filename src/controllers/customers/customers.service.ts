import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>
  ) {}

  async create(dto: CreateCustomerDto) {
    try {
      console.log('Criando cliente com DTO:', dto);
  
      const newCustomer = this.repository.create(dto);
  
      console.log('Novo cliente a ser salvo:', newCustomer);

      return await this.repository.save(newCustomer);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw new BadRequestException('Falha ao criar cliente');
    }
  }
  
  async findAll() {
    const customers = await this.repository.find();
    if (customers.length === 0) {
      throw new NotFoundException('No customers found');
    }
    return customers;
  }

  async findOne(id: number) {
    const customer = await this.repository.findOne({
      where: { id: id }
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto) {
    const customer = await this.repository.findOne({
      where: { id: id }
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    this.repository.merge(customer, dto);
    return this.repository.save(customer);
  }

  async remove(id: number) {
    const customer = await this.repository.findOne({
      where: { id: id }
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return this.repository.remove(customer);
  }
}
