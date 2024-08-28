import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCreditCardDto } from 'src/interfaces/dto/credit-cards/create-credit-card.dto';
import { UpdateCreditCardDto } from 'src/interfaces/dto/credit-cards/update-credit-card.dto';
import { Repository } from 'typeorm';
import { CreditCards } from 'src/domain/entities/credit-card.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreditCardsService {
  constructor(
    @InjectRepository(CreditCards)
    private readonly repository: Repository<CreditCards>
  ) {}

  async create(dto: CreateCreditCardDto) {
    try {
      console.log('Criando cartão de crédito com DTO:', dto);
  
      const newCreditCard = this.repository.create(dto);
  
      console.log('Novo cartão de crédito a ser salvo:', newCreditCard);

      return await this.repository.save(newCreditCard);
    } catch (error) {
      console.error('Erro ao criar cartão de crédito:', error);
      throw new BadRequestException('Falha ao criar cartão de crédito');
    }
  }
  
  async findAll() {
    const credit_cards = await this.repository.find();
    return credit_cards;
  }

  async findOne(id: number) {
    const credit_card = await this.repository.findOne({
      where: { id: id }
    });
    if (!credit_card) {
      throw new NotFoundException(`CreditCard with ID ${id} not found`);
    }
    return credit_card;
  }

  async update(id: number, dto: UpdateCreditCardDto) {
    const credit_card = await this.repository.findOne({
      where: { id: id }
    });
    if (!credit_card) {
      throw new NotFoundException(`CreditCard with ID ${id} not found`);
    }
    const updatedCreditCard = { ...credit_card, ...dto };
    return await this.repository.save(updatedCreditCard);
  }

  async remove(id: number) {
    const credit_card = await this.repository.findOne({
      where: { id: id }
    });
    if (!credit_card) {
      throw new NotFoundException(`CreditCard with ID ${id} not found`);
    }
    return this.repository.remove(credit_card);
  }
}
