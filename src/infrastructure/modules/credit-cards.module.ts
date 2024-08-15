import { Module } from '@nestjs/common';
import { CreditCardsService } from 'src/application/services/credit-cards/credit-cards.service';
import { CreditCardsController } from 'src/interfaces/controllers/credit-cards/credit-cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCards } from 'src/domain/entities/credit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCards])],
  controllers: [CreditCardsController],
  providers: [CreditCardsService],
})
export class CreditCardsModule {}
