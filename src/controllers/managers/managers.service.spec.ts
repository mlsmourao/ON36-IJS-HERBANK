import { Test, TestingModule } from '@nestjs/testing';
import { ManagersService } from './managers.service';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('Testing ManagersService', () => {
  let service: ManagersService;
  let repository: Repository<Manager>;

  const mockManager = {
    id: 1,
    fullName: '123',
    customers: [],
  };

  const mockRepository = {
    create: jest.fn(dto => ({ ...dto, id: Date.now() })),
    save: jest.fn(manager => Promise.resolve(manager)),
    find: jest.fn(() => Promise.resolve([mockManager])),
    findOne: jest.fn(id => Promise.resolve(id === 1 ? mockManager : null)),
    merge: jest.fn((manager, dto) => Object.assign(manager, dto)),
    remove: jest.fn(id => Promise.resolve(id === 1 ? mockManager : null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManagersService,
        {
          provide: getRepositoryToken(Manager),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ManagersService>(ManagersService);
    repository = module.get<Repository<Manager>>(getRepositoryToken(Manager));
  });

  describe('create', () => {
    it('should create a manager', async () => {
      const createManagerDto = {
        fullName: '123',
        customers: [],
      };

      const result = await service.create(createManagerDto);
      expect(result).toEqual({ ...createManagerDto, id: expect.any(Number) });
      expect(mockRepository.create).toHaveBeenCalledWith(createManagerDto);
      expect(mockRepository.save).toHaveBeenCalledWith({ ...createManagerDto, id: expect.any(Number) });
    });

    it('should throw BadRequestException on failure', async () => {
      jest.spyOn(mockRepository, 'save').mockRejectedValueOnce(new Error('Some error'));
      const createManagerDto = {
        fullName: '123',
        customers: [],
      };

      await expect(service.create(createManagerDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all managers', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockManager]);
      expect(mockRepository.find).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no managers found', async () => {
      jest.spyOn(mockRepository, 'find').mockResolvedValueOnce([]);
      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    // it('should return a manager by ID', async () => {
    //   const result = await service.findOne(1);
    //   expect(result).toEqual(mockManager);
    //   expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    // });

    it('should throw NotFoundException if manager not found', async () => {
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('update', () => {
    // it('should update a manager', async () => {
    //   const updateManagerDto = { fullName: 'Updated Name' };

    //   const result = await service.update(1, updateManagerDto);
    //   expect(result).toEqual({ ...mockManager, ...updateManagerDto });
    //   expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    //   expect(mockRepository.merge).toHaveBeenCalledWith(mockManager, updateManagerDto);
    //   expect(mockRepository.save).toHaveBeenCalledWith({ ...mockManager, ...updateManagerDto });
    // });

    it('should throw NotFoundException if manager to update not found', async () => {
      const updateManagerDto = { fullName: 'Updated Name' };

      await expect(service.update(999, updateManagerDto)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('remove', () => {
    // it('should remove a manager', async () => {
    //   await service.remove(1);
    //   expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    //   expect(mockRepository.remove).toHaveBeenCalledWith(mockManager);
    // });

    it('should throw NotFoundException if manager to remove not found', async () => {
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });
});
