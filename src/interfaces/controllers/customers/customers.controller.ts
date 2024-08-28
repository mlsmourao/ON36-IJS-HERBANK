import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { CustomersService } from 'src/application/services/customers/customers.service';
import { CreateCustomerDto } from 'src/interfaces/dto/customers/create-customer.dto';
import { UpdateCustomerDto } from 'src/interfaces/dto/customers/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const customer = await this.customersService.findOne(id);
    if (!customer) throw new NotFoundException(`Customer with ID ${id} not found`);
    return customer;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const customer = await this.customersService.update(id, updateCustomerDto);
    if (!customer) throw new NotFoundException(`Customer with ID ${id} not found`);
    return customer;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const customer = await this.customersService.remove(id);
    if (!customer) throw new NotFoundException(`Customer with ID ${id} not found`);
  }
}
