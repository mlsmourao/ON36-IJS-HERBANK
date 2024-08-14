import { Test, TestingModule } from '@nestjs/testing';
import { ManagersService } from './managers.service';
import { Repository } from 'typeorm';
import { Manager } from 'src/domain/entities/manager.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateManagerDto } from 'src/interfaces/dto/update-manager.dto';

describe('Testing ManagersService', () => {
  let service: ManagersService;
  let repository: Repository<Manager>;

  const mockRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(manager => ({
      id: Date.now(),
      ...manager,
    })),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
      if (id === 1) {
        return {  id, 
                  fullName: 'Maria',
                  customers: []};
                }
                return null;
              }),
    merge: jest.fn().mockImplementation((manager, dto) => ({
      ...manager,
      ...dto,
    })),
    remove: jest.fn().mockImplementation(manager => manager),
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
        fullName: 'Maria',
        customers: [],
      };

      const result = await service.create(createManagerDto);
      expect(result).toEqual({
        id: expect.any(Number),
        ...createManagerDto,
      });
      expect(repository.create).toHaveBeenCalledWith(createManagerDto);
      expect(repository.save).toHaveBeenCalledWith(createManagerDto);
    });

    it('should throw BadRequestException on failure', async () => {
      jest.spyOn(mockRepository, 'save').mockRejectedValueOnce(new Error('Some error'));
      const createManagerDto = {
        fullName: 'Maria',
        customers: [],
      };

      await expect(service.create(createManagerDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all managers', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(mockRepository.find).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no managers found', async () => {
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('findOne', () => {
    it('should return a manager by ID', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual({
        id: 1,
        fullName: 'Maria',
        customers: [],
      });
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if manager not found', async () => {
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('update', () => {
    it('should update a manager', async () => {
      const updateManagerDto: UpdateManagerDto = {         
        fullName: 'Maria Updated',
        customers: [], };

      const result = await service.update(1, updateManagerDto);
      const expectedResult = {
        id: 1,
        fullName: 'Maria',
        customers: []
      }
      expect(result).toEqual(expectedResult);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if manager to update not found', async () => {
      const updateManagerDto = { fullName: 'Updated Name' };

      await expect(service.update(999, updateManagerDto)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('remove', () => {
    it('should remove a customer by ID', async () => {
      await service.remove(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalledWith({
        id: 1,
        fullName: 'Maria',
        customers: []
      });
    });

    it('should throw NotFoundException if manager to remove not found', async () => {
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });
});
