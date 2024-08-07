import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardsService } from './credit-cards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreditCards } from './entities/credit-card.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';

describe('Testing CreditCardsService', () => {
  let service: CreditCardsService;
  let repository: Repository<CreditCards>;

  const mockCreditCardsRepository = {
    create: jest.fn(dto => ({ id: Date.now(), ...dto })),
    save: jest.fn(card => Promise.resolve(card)),
    find: jest.fn(() => Promise.resolve([{
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
    }])),
    findOne: jest.fn(id => Promise.resolve(id === 1 ? {
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
    } : null)),
    remove: jest.fn(id => Promise.resolve(id === 1 ? {
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
    } : null)),
    merge: jest.fn(),
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
    expect(await service.create(createCreditCardDto)).toEqual({
      id: expect.any(Number),
      ...createCreditCardDto,
    });
    expect(repository.create).toHaveBeenCalledWith(createCreditCardDto);
    expect(repository.save).toHaveBeenCalledWith({
      id: expect.any(Number),
      ...createCreditCardDto,
    });
  });

  it('should return all credit cards', async () => {
    expect(await service.findAll()).toEqual([{
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
    expect(repository.find).toHaveBeenCalled();
  });

  // it('should return a specific credit card by ID', async () => {
  //   expect(await service.findOne(1)).toEqual({
  //     id: 1,
  //     creditId: 1,
  //     cardNumber: 123456789,
  //     securityCode: '123',
  //     cardExpiration: '03/25',
  //     creditLimit: 1234,
  //     outstandingBalance: 123,
  //     transactionsIds: [],
  //     duedates: [],
  //     closingDates: [],
  //   });
  //   expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  // });

  it('should throw NotFoundException if credit card not found by ID', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  // it('should update a specific credit card by ID', async () => {
  //   const updateCreditCardDto: UpdateCreditCardDto = {
  //     cardNumber: 987654321,
  //     securityCode: 321,
  //     cardExpiration: '12/26',
  //     creditLimit: 5678,
  //     outstandingBalance: 456,
  //     transactionsIds: [],
  //     duedates: [],
  //     closingDates: [],
  //   };
  //   expect(await service.update(1, updateCreditCardDto)).toEqual({
  //     id: 1,
  //     ...updateCreditCardDto,
  //   });
  //   expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  //   expect(repository.merge).toHaveBeenCalledWith(expect.any(Object), updateCreditCardDto);
  //   expect(repository.save).toHaveBeenCalledWith({
  //     id: 1,
  //     ...updateCreditCardDto,
  //   });
  // });

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

  // it('should delete a specific credit card by ID', async () => {
  //   await service.remove(1);
  //   expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  //   expect(repository.remove).toHaveBeenCalledWith({
  //     id: 1,
  //     creditId: 1,
  //     cardNumber: 123456789,
  //     securityCode: '123',
  //     cardExpiration: '03/25',
  //     creditLimit: 1234,
  //     outstandingBalance: 123,
  //     transactionsIds: [],
  //     duedates: [],
  //     closingDates: [],
  //   });
  // });

  it('should throw NotFoundException if credit card to delete not found', async () => {
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
