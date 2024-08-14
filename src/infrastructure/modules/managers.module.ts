import { Module } from '@nestjs/common';
import { ManagersService } from 'src/application/services/managers.service';
import { ManagersController } from 'src/interfaces/controllers/managers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from 'src/domain/entities/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
