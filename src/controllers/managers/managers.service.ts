import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private readonly repository: Repository<Manager>
  ) {}

  async create(dto: CreateManagerDto) {
    try {
      console.log('Criando gerente com DTO:', dto);
  
      const newManager = this.repository.create(dto);
  
      console.log('Novo gerente a ser salvo:', newManager);

      return await this.repository.save(newManager);
    } catch (error) {
      console.error('Erro ao criar gerente:', error);
      throw new BadRequestException('Falha ao criar gerente');
    }
  }
  
  async findAll() {
    const managers = await this.repository.find();
    if (managers.length === 0) {
      throw new NotFoundException('No managers found');
    }
    return managers;
  }

  async findOne(id: number) {
    const manager = await this.repository.findOne({
      where: { id: id }
    });
    if (!manager) {
      throw new NotFoundException(`Manager with ID ${id} not found`);
    }
    return manager;
  }

  async update(id: number, dto: UpdateManagerDto) {
    const manager = await this.repository.findOne({
      where: { id: id }
    });
    if (!manager) {
      throw new NotFoundException(`Manager with ID ${id} not found`);
    }
    this.repository.merge(manager, dto);
    return this.repository.save(manager);
  }

  async remove(id: number) {
    const manager = await this.repository.findOne({
      where: { id: id }
    });
    if (!manager) {
      throw new NotFoundException(`Manager with ID ${id} not found`);
    }
    return this.repository.remove(manager);
  }
}
