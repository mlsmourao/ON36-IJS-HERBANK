import { Test, TestingModule } from '@nestjs/testing';
import { LoansController } from './loans.controller';
import { LoansService } from 'src/application/services/loans/loans.service';
import { CreateLoanDto } from 'src/interfaces/dto/loans/create-loan.dto';
import { UpdateLoanDto } from 'src/interfaces/dto/loans/update-loan.dto';
import { NotFoundException } from '@nestjs/common';

describe('Testing LoansController', () => {
  let controller: LoansController;
  let service: LoansService;

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

  const mockLoansService = {
    create: jest.fn(dto => ({ ...dto, id: Date.now() })),
    findAll: jest.fn(() => Promise.resolve([mockLoan])),
    findOne: jest.fn(id => Promise.resolve(id === 1 ? mockLoan : null)),
    update: jest.fn((id, dto) => Promise.resolve(id === 1 ? { ...mockLoan, ...dto } : null)),
    remove: jest.fn(id => Promise.resolve(id === 1 ? mockLoan : null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoansController],
      providers: [
        {
          provide: LoansService,
          useValue: mockLoansService,
        },
      ],
    }).compile();

    controller = module.get<LoansController>(LoansController);
    service = module.get<LoansService>(LoansService);
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

    const result = await controller.create(createLoanDto);
    expect(result).toEqual({ ...createLoanDto, id: expect.any(Number) });
    expect(mockLoansService.create).toHaveBeenCalledWith(createLoanDto);
  });

  it('should return all loans', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockLoan]);
    expect(mockLoansService.findAll).toHaveBeenCalled();
  });

  it('should return a loan by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual(mockLoan);
    expect(mockLoansService.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if loan not found by ID', async () => {
    await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    expect(mockLoansService.findOne).toHaveBeenCalledWith(999);
  });

  it('should update a loan by ID', async () => {
    const updateLoanDto: UpdateLoanDto = { amount: 200 };
    const result = await controller.update(1, updateLoanDto);
    expect(result).toEqual({ ...mockLoan, ...updateLoanDto });
    expect(mockLoansService.update).toHaveBeenCalledWith(1, updateLoanDto);
  });

  it('should throw NotFoundException if loan to update not found', async () => {
    const updateLoanDto: UpdateLoanDto = { amount: 200 };
    await expect(controller.update(999, updateLoanDto)).rejects.toThrow(NotFoundException);
    expect(mockLoansService.update).toHaveBeenCalledWith(999, updateLoanDto);
  });

  it('should remove a loan by ID', async () => {
    const result = await controller.remove(1);
    expect(result).toBeUndefined();
    expect(mockLoansService.remove).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if loan to remove not found', async () => {
    await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    expect(mockLoansService.remove).toHaveBeenCalledWith(999);
  });
});
