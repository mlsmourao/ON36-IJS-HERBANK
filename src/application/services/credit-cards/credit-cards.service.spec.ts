import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardsService } from './credit-cards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreditCards } from 'src/domain/entities/credit-card.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateCreditCardDto } from 'src/interfaces/dto/credit-cards/create-credit-card.dto';
import { UpdateCreditCardDto } from 'src/interfaces/dto/credit-cards/update-credit-card.dto';

describe('Testing CreditCardsService', () => {
  let service: CreditCardsService;
  let repository: Repository<CreditCards>;

  const mockCreditCardsRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(creditCard => ({
      id: Date.now(),
      ...creditCard,
    })),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
      if (id === 1) {
        return { id, 
                 creditId: 1,
                 cardNumber: 123456789,
                 securityCode: '123',
                 cardExpiration: '03/25',
                 creditLimit: 1234,
                 outstandingBalance: 123,
                 transactionsIds: [],
                 duedates: [],
                 closingDates: [] };
                }
                return null;
              }),
    merge: jest.fn().mockImplementation((creditCard, dto) => ({
      ...creditCard,
      ...dto,
    })),
    remove: jest.fn().mockImplementation(creditCard => creditCard),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditCardsService,
        {
          provide: getRepositoryToken(CreditCards),
          useValue: mockCreditCardsRepository,
        },
      ],
    }).compile();

    service = module.get<CreditCardsService>(CreditCardsService);
    repository = module.get<Repository<CreditCards>>(getRepositoryToken(CreditCards));
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
    const result = await service.create(createCreditCardDto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...createCreditCardDto,
    });
    expect(repository.create).toHaveBeenCalledWith(createCreditCardDto);
    expect(repository.save).toHaveBeenCalledWith(createCreditCardDto);
  });

  it('should return all credit cards', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a specific credit card by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
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
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException if credit card not found by ID', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a specific credit card by ID', async () => {
    const updateCreditCardDto: UpdateCreditCardDto = {
      cardNumber: 987654321,
      securityCode: 321,
      cardExpiration: '12/26',
      creditLimit: 5678,
      outstandingBalance: 456,
      transactionsIds: [],
      duedates: [],
      closingDates: [],
    };
    const result = await service.update(1, updateCreditCardDto);

    const expectedResult = {
      id: 1,
      creditId: 1,
      ...updateCreditCardDto,
    };
  
    expect(result).toEqual(expectedResult);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.save).toHaveBeenCalled();
  });
  

  it('should throw NotFoundException if credit card to update not found', async () => {
    const updateCreditCardDto: UpdateCreditCardDto = {
      cardNumber: 987654321,
      securityCode: 321,
      cardExpiration: '12/26',
      creditLimit: 5678,
      outstandingBalance: 456,
      transactionsIds: [],
      duedates: [],
      closingDates: [],
    };
    await expect(service.update(999, updateCreditCardDto)).rejects.toThrow(NotFoundException);
  });

  it('should delete a specific credit card by ID', async () => {
    await service.remove(1);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.remove).toHaveBeenCalledWith({
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
  });

  it('should throw NotFoundException if credit card to delete not found', async () => {
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
