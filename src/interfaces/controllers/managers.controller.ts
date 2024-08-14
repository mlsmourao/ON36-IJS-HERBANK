import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { ManagersService } from 'src/application/services/managers.service';
import { CreateManagerDto } from 'src/interfaces/dto/create-manager.dto';
import { UpdateManagerDto } from 'src/interfaces/dto/update-manager.dto';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  async create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @Get()
  findAll() {
    return this.managersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const manager = await this.managersService.findOne(id);
    if (!manager) throw new NotFoundException(`Manager with ID ${id} not found`);
    return manager;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateManagerDto: UpdateManagerDto,
  ) {
    const manager = await this.managersService.update(id, updateManagerDto);
    if (!manager) throw new NotFoundException(`Manager with ID ${id} not found`);
    return manager;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const manager = await this.managersService.remove(id);
    if (!manager) throw new NotFoundException(`Manager with ID ${id} not found`);
  }
}
