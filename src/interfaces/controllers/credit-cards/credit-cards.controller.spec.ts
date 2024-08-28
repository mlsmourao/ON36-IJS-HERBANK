import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardsController } from './credit-cards.controller';
import { CreateCreditCardDto } from 'src/interfaces/dto/credit-cards/create-credit-card.dto';
import { UpdateCreditCardDto } from 'src/interfaces/dto/credit-cards/update-credit-card.dto';
import { CreditCardsService } from 'src/application/services/credit-cards/credit-cards.service';
import { NotFoundException } from '@nestjs/common';

describe('Testing CreditCardsController', () => {
  let controller: CreditCardsController;
  let service: CreditCardsService;

  const mockCreditCardsService = {
    create: jest.fn(dto => ({ id: Date.now(), ...dto })),
    findAll: jest.fn(() => [{
      id: 1,
      creditId: 1,
      cardNumber: 123456789,
      securityCode: '123',
      cardExpiration: '03/25',
      creditLimit: 1234,
      outstandingBalance: 123,
      transactionsIds: [],
      duedates: [],
      closingDates: [],
    }]),
    findOne: jest.fn(id => id === 1 ? {
      id,
      creditId: 1,
      cardNumber: 123456789,
      securityCode: '123',
      cardExpiration: '03/25',
      creditLimit: 1234,
      outstandingBalance: 123,
      transactionsIds: [],
      duedates: [],
      closingDates: [],
    } : null),
    update: jest.fn((id, dto) => id === 1 ? { id, ...dto } : null),
    remove: jest.fn(id => id === 1 ? {
      id,
      creditId: 1,
      cardNumber: 123456789,
      securityCode: '123',
      cardExpiration: '03/25',
      creditLimit: 1234,
      outstandingBalance: 123,
      transactionsIds: [],
      duedates: [],
      closingDates: [],
    } : null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditCardsController],
      providers: [
        {
          provide: CreditCardsService,
          useValue: mockCreditCardsService,
        },
      ],
    }).compile();

    controller = module.get<CreditCardsController>(CreditCardsController);
    service = module.get<CreditCardsService>(CreditCardsService);
  });

  it('should create a credit card', async () => {
    const createCreditCardDto: CreateCreditCardDto = {
      creditId: 1,
      cardNumber: 123456789,
      securityCode: 123,
      cardExpiration: '03/25',
      creditLimit: 1234,
      outstandingBalance: 123,
      transactionsIds: [],
      duedates: [],
      closingDates: [],
    };
    expect(await controller.create(createCreditCardDto)).toEqual({
      id: expect.any(Number),
      ...createCreditCardDto,
    });
    expect(service.create).toHaveBeenCalledWith(createCreditCardDto);
  });

  it('should return all credit cards', async () => {
    expect(await controller.findAll()).toEqual([{
      id: 1,
      creditId: 1,
      cardNumber: 123456789,
      securityCode: '123',
      cardExpiration: '03/25',
      creditLimit: 1234,
      outstandingBalance: 123,
      transactionsIds: [],
      duedates: [],
      closingDates: [],
    }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a specific credit card by ID', async () => {
    expect(await controller.findOne(1)).toEqual({
      id: 1,
      creditId: 1,
      cardNumber: 123456789,
      securityCode: '123',
      cardExpiration: '03/25',
      creditLimit: 1234,
      outstandingBalance: 123,
      transactionsIds: [],
      duedates: [],
      closingDates: [],
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if credit card not found by ID', async () => {
    await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a specific credit card by ID', async () => {
    const updateCreditCardDto: UpdateCreditCardDto = {
      creditId: 1,
      cardNumber: 987654321,
      securityCode: 321,
      cardExpiration: '12/26',
      creditLimit: 5678,
      outstandingBalance: 456,
      transactionsIds: [],
      duedates: [],
      closingDates: [],
    };
    expect(await controller.update(1, updateCreditCardDto)).toEqual({ id: 1, ...updateCreditCardDto });
    expect(service.update).toHaveBeenCalledWith(1, updateCreditCardDto);
  });

  it('should throw NotFoundException if credit card to update not found', async () => {
    const updateCreditCardDto: UpdateCreditCardDto = {
      creditId: 1,
      cardNumber: 987654321,
      securityCode: 321,
      cardExpiration: '12/26',
      creditLimit: 5678,
      outstandingBalance: 456,
      transactionsIds: [],
      duedates: [],
      closingDates: [],
    };
    await expect(controller.update(999, updateCreditCardDto)).rejects.toThrow(NotFoundException);
  });

  it('should delete a specific credit card by ID', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if credit card to delete not found', async () => {
    await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
  });
});
