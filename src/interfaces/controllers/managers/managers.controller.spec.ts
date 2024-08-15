import { Test, TestingModule } from '@nestjs/testing';
import { ManagersController } from './managers.controller';
import { ManagersService } from 'src/application/services/managers/managers.service';
import { CreateManagerDto } from 'src/interfaces/dto/managers/create-manager.dto';
import { UpdateManagerDto } from 'src/interfaces/dto/managers/update-manager.dto';
import { NotFoundException } from '@nestjs/common';

describe('Testing ManagersController', () => {
  let controller: ManagersController;
  let service: ManagersService;

  const mockManager = {
    id: 1,
    fullName: '123',
    customers: [],
  };

  const mockService = {
    create: jest.fn(dto => Promise.resolve({ ...dto, id: Date.now() })),
    findAll: jest.fn(() => Promise.resolve([mockManager])),
    findOne: jest.fn(id => Promise.resolve(id === 1 ? mockManager : null)),
    update: jest.fn((id, dto) => Promise.resolve(id === 1 ? { ...mockManager, ...dto } : null)),
    remove: jest.fn(id => Promise.resolve(id === 1 ? mockManager : null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagersController],
      providers: [
        {
          provide: ManagersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ManagersController>(ManagersController);
    service = module.get<ManagersService>(ManagersService);
  });

  describe('create', () => {
    it('should create a manager', async () => {
      const createManagerDto: CreateManagerDto = {
        fullName: '123',
        customers: [],
      };

      const result = await controller.create(createManagerDto);
      expect(result).toEqual({ ...createManagerDto, id: expect.any(Number) });
      expect(mockService.create).toHaveBeenCalledWith(createManagerDto);
    });
  });

  describe('findAll', () => {
    it('should return all managers', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockManager]);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a manager by ID', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(mockManager);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if manager not found', async () => {
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
      expect(mockService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('update', () => {
    it('should update a manager', async () => {
      const updateManagerDto: UpdateManagerDto = { fullName: 'Updated Name' };

      const result = await controller.update(1, updateManagerDto);
      expect(result).toEqual({ ...mockManager, ...updateManagerDto });
      expect(mockService.update).toHaveBeenCalledWith(1, updateManagerDto);
    });

    it('should throw NotFoundException if manager to update not found', async () => {
      const updateManagerDto: UpdateManagerDto = { fullName: 'Updated Name' };

      await expect(controller.update(999, updateManagerDto)).rejects.toThrow(NotFoundException);
      expect(mockService.update).toHaveBeenCalledWith(999, updateManagerDto);
    });
  });

  describe('remove', () => {
    it('should remove a manager', async () => {
      await controller.remove(1);
      expect(mockService.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if manager to remove not found', async () => {
      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
      expect(mockService.remove).toHaveBeenCalledWith(999);
    });
  });
});
