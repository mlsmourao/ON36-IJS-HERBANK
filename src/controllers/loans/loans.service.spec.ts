import { Test, TestingModule } from '@nestjs/testing';
import { LoansService } from './loans.service';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

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
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(loan => ({
      id: Date.now(),
      ...loan,
    })),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
      if (id === 1) {
        return {  id, 
                  creditId: 1,
                  amount: 123,
                  interest: 123,
                  approvalDate: 'dez/2022',
                  dueDates: [],
                  installments: 123,
                  status: 'approved',
                  installmentTransactions: [],
                  installmentStatus: [] };
                }
                return null;
              }),
    merge: jest.fn().mockImplementation((loan, dto) => ({
      ...loan,
      ...dto,
    })),
    remove: jest.fn().mockImplementation(customer => customer),
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
    const createLoanDto: CreateLoanDto = {
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
    expect(result).toEqual({
      id: expect.any(Number),
      ...createLoanDto,
    });
    expect(repository.create).toHaveBeenCalledWith(createLoanDto);
    expect(repository.save).toHaveBeenCalledWith(createLoanDto);
  });

  it('should return all loans', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should return a loan by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      creditId: 1,
      amount: 123,
      interest: 123,
      approvalDate: 'dez/2022',
      dueDates: [],
      installments: 123,
      status: 'approved',
      installmentTransactions: [],
      installmentStatus: []
    });
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a loan by ID', async () => {
    const updateLoanDto: UpdateLoanDto = {
      creditId: 1,
      amount: 123,
      interest: 123,
      approvalDate: 'mar/2022',
      dueDates: [],
      installments: 123,
      status: 'approved',
      installmentTransactions: [],
      installmentStatus: []
    };
    const result = await service.update(1, updateLoanDto);

    const expectedResult = {
      id: 1,
      creditId: 1,
      amount: 123,
      interest: 123,
      approvalDate: 'dez/2022',
      dueDates: [],
      installments: 123,
      status: 'approved',
      installmentTransactions: [],
      installmentStatus: []
    }
    expect(result).toEqual(expectedResult);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.save).toHaveBeenCalled();
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
