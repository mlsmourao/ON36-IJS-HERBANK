import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from 'src/interfaces/dto/customers/create-customer.dto';
import { UpdateCustomerDto } from 'src/interfaces/dto/customers/update-customer.dto';
import { Repository } from 'typeorm';
import { Customer } from 'src/domain/entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CorreiosApiService } from 'src/infrastructure/apis/correios-api.services';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
    private readonly correiosApiService: CorreiosApiService
  ) {}

  async create(dto: CreateCustomerDto) {
    try {
      console.log('Criando cliente com DTO:', dto);

      const endereco = await this.correiosApiService.consultaCep(dto.cep);

      console.log('Endereço retornado pela API dos Correios:', endereco);

      if (!endereco) {
        throw new BadRequestException('CEP inválido');
      }

      dto.address = endereco;

      console.log('DTO após atualização do endereço:', dto);

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
