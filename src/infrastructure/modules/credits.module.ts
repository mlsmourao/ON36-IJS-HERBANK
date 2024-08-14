import { Module } from '@nestjs/common';
import { CreditsService } from 'src/application/services/credits.service';
import { CreditsController } from 'src/interfaces/controllers/credits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credit } from 'src/domain/entities/credit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credit])],
  controllers: [CreditsController],
  providers: [CreditsService],
})
export class CreditsModule {}
