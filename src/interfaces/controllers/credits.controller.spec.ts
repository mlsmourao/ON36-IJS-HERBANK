import { Test, TestingModule } from '@nestjs/testing';
import { CreditsController } from './credits.controller';
import { CreditsService } from 'src/application/services/credits.service';
import { CreateCreditDto } from 'src/interfaces/dto/create-credit.dto';
import { UpdateCreditDto } from 'src/interfaces/dto/update-credit.dto';
import { NotFoundException } from '@nestjs/common';

describe('Testing CreditsController', () => {
  let controller: CreditsController;
  let service: CreditsService;

  const mockCreditsService = {
    create: jest.fn(dto => Promise.resolve({ id: Date.now(), ...dto })),
    findAll: jest.fn(() => Promise.resolve([
      { id: 1, accountId: 123 },
    ])),
    findOne: jest.fn(id => Promise.resolve(id === 1 ? { id, accountId: 123 } : null)),
    update: jest.fn((id, dto) => Promise.resolve(id === 1 ? { id, ...dto } : null)),
    remove: jest.fn(id => Promise.resolve(id === 1 ? { id, accountId: 123 } : null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditsController],
      providers: [
        {
          provide: CreditsService,
          useValue: mockCreditsService,
        },
      ],
    }).compile();

    controller = module.get<CreditsController>(CreditsController);
    service = module.get<CreditsService>(CreditsService);
  });

  it('should create a credit', async () => {
    const createCreditDto: CreateCreditDto = { accountId: 123 };
    expect(await controller.create(createCreditDto)).toEqual({
      id: expect.any(Number),
      ...createCreditDto,
    });
    expect(service.create).toHaveBeenCalledWith(createCreditDto);
  });

  it('should return all credits', async () => {
    expect(await controller.findAll()).toEqual([
      { id: 1, accountId: 123 },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a specific credit by ID', async () => {
    expect(await controller.findOne(1)).toEqual({ id: 1, accountId: 123 });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if credit not found by ID', async () => {
    await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a specific credit by ID', async () => {
    const updateCreditDto: UpdateCreditDto = { accountId: 456 };
    expect(await controller.update(1, updateCreditDto)).toEqual({
      id: 1,
      ...updateCreditDto,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateCreditDto);
  });

  it('should throw NotFoundException if credit to update not found', async () => {
    const updateCreditDto: UpdateCreditDto = { accountId: 456 };
    await expect(controller.update(999, updateCreditDto)).rejects.toThrow(NotFoundException);
  });

  it('should delete a specific credit by ID', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if credit to delete not found', async () => {
    await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
  });
});
