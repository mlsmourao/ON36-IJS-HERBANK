import { Test, TestingModule } from '@nestjs/testing';
import { LoansService } from './loans.service';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('LoansService', () => {
  let service: LoansService;
  let repository: Repository<Loan>;

  const mockLoan = {
    id: 1,
    creditId: 1,
    amount: 123,
    interest: 123,
    approvalDate: 'dez/2022',
    dueDates: [],
    installments: 123,
    status: 'approved',
    installmentTransactions: [],
    installmentStatus: [],
  };

  const mockRepository = {
    create: jest.fn(dto => ({ ...dto, id: Date.now() })),
    save: jest.fn(loan => Promise.resolve(loan)),
    find: jest.fn(() => Promise.resolve([mockLoan])),
    findOne: jest.fn(id => Promise.resolve(id === 1 ? mockLoan : null)),
    merge: jest.fn((loan, dto) => Object.assign(loan, dto)),
    remove: jest.fn(id => Promise.resolve(id === 1 ? mockLoan : null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoansService,
        {
          provide: getRepositoryToken(Loan),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LoansService>(LoansService);
    repository = module.get<Repository<Loan>>(getRepositoryToken(Loan));
  });

  it('should create a loan', async () => {
    const createLoanDto = {
      creditId: 1,
      amount: 123,
      interest: 123,
      approvalDate: 'dez/2022',
      dueDates: [],
      installments: 123,
      status: 'approved',
      installmentTransactions: [],
      installmentStatus: [],
    };

    const result = await service.create(createLoanDto);
    expect(result).toEqual({ ...createLoanDto, id: expect.any(Number) });
    expect(mockRepository.create).toHaveBeenCalledWith(createLoanDto);
    expect(mockRepository.save).toHaveBeenCalledWith({ ...createLoanDto, id: expect.any(Number) });
  });

  it('should return all loans', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockLoan]);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should return a loan by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockLoan);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException if loan not found by ID', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
  });

  it('should update a loan by ID', async () => {
    const updateLoanDto = { amount: 200 };
    const result = await service.update(1, updateLoanDto);
    expect(result).toEqual({ ...mockLoan, ...updateLoanDto });
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockRepository.merge).toHaveBeenCalledWith(mockLoan, updateLoanDto);
    expect(mockRepository.save).toHaveBeenCalledWith({ ...mockLoan, ...updateLoanDto });
  });

  it('should throw NotFoundException if loan to update not found', async () => {
    const updateLoanDto = { amount: 200 };
    await expect(service.update(999, updateLoanDto)).rejects.toThrow(NotFoundException);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
  });

  it('should remove a loan by ID', async () => {
    const result = await service.remove(1);
    expect(result).toEqual(mockLoan);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockRepository.remove).toHaveBeenCalledWith(mockLoan);
  });

  it('should throw NotFoundException if loan to remove not found', async () => {
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
  });
});
