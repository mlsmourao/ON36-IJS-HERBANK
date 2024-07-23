import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  findAll() {
    return this.loansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const loan = await this.loansService.findOne(id);
    if (!loan) throw new NotFoundException(`Loan with ID ${id} not found`);
    return loan;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateLoanDto: UpdateLoanDto,
  ) {
    const loan = await this.loansService.update(id, updateLoanDto);
    if (!loan) throw new NotFoundException(`Loan with ID ${id} not found`);
    return loan;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const loan = await this.loansService.remove(id);
    if (!loan) throw new NotFoundException(`Loan with ID ${id} not found`);
  }
}
