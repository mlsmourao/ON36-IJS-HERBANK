import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { CreditCardsService } from 'src/application/services/credit-cards.service';
import { CreateCreditCardDto } from 'src/interfaces/dto/create-credit-card.dto';
import { UpdateCreditCardDto } from 'src/interfaces/dto/update-credit-card.dto';

@Controller('credit_cards')
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Post()
  async create(@Body() createCreditCardDto: CreateCreditCardDto) {
    return this.creditCardsService.create(createCreditCardDto);
  }

  @Get()
  findAll() {
    return this.creditCardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const credit_card = await this.creditCardsService.findOne(id);
    if (!credit_card) throw new NotFoundException(`CreditCard with ID ${id} not found`);
    return credit_card;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateCreditCardDto: UpdateCreditCardDto,
  ) {
    const credit_card = await this.creditCardsService.update(id, updateCreditCardDto);
    if (!credit_card) throw new NotFoundException(`CreditCard with ID ${id} not found`);
    return credit_card;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const credit_card = await this.creditCardsService.remove(id);
    if (!credit_card) throw new NotFoundException(`CreditCard with ID ${id} not found`);
  }
}
