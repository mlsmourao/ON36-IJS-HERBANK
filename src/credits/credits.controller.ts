import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';

@Controller('credits')
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Post()
  async create(@Body() createCreditDto: CreateCreditDto) {
    return this.creditsService.create(createCreditDto);
  }

  @Get()
  findAll() {
    return this.creditsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const credit = await this.creditsService.findOne(id);
    if (!credit) throw new NotFoundException(`Credit with ID ${id} not found`);
    return credit;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateCreditDto: UpdateCreditDto,
  ) {
    const credit = await this.creditsService.update(id, updateCreditDto);
    if (!credit) throw new NotFoundException(`Credit with ID ${id} not found`);
    return credit;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const credit = await this.creditsService.remove(id);
    if (!credit) throw new NotFoundException(`Credit with ID ${id} not found`);
  }
}
