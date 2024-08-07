import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('Testing CustomersService', () => {
  let service: CustomersService;
  let repository: Repository<Customer>;

  const mockCustomer = {
    id: 1,
    fullName: 'Maria',
    birthDate: '',
    cpf: '12345678900',
    address: 'Rua Maia de Lacerda, 91',
    phoneNumbers: [],
    email: 'marialuiza@mail.com',
    creditHistory: [],
    accounts: [],
    managerId: 1,
  };

  const mockRepository = {
    create: jest.fn(dto => ({ ...dto, id: Date.now() })),
    save: jest.fn(customer => Promise.resolve(customer)),
    find: jest.fn(() => Promise.resolve([mockCustomer])),
    findOne: jest.fn(id => Promise.resolve(id === 1 ? mockCustomer : null)),
    merge: jest.fn(),
    remove: jest.fn(customer => Promise.resolve(customer)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it('should create a customer', async () => {
    const createCustomerDto = {
      fullName: 'Maria',
      birthDate: '',
      cpf: '12345678900',
      address: 'Rua Maia de Lacerda, 91',
      phoneNumbers: [],
      email: 'marialuiza@mail.com',
      creditHistory: [],
      accounts: [],
      managerId: 1,
    };

    const result = await service.create(createCustomerDto);
    expect(result).toEqual({ ...createCustomerDto, id: expect.any(Number) });
    expect(mockRepository.create).toHaveBeenCalledWith(createCustomerDto);
    expect(mockRepository.save).toHaveBeenCalledWith(result);
  });

  it('should return all customers', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockCustomer]);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  // it('should return a customer by ID', async () => {
  //   const result = await service.findOne(1);
  //   expect(result).toEqual(mockCustomer);
  //   expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  // });

  it('should throw NotFoundException if customer not found by ID', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
  });

  // it('should update a customer by ID', async () => {
  //   const updateCustomerDto = { fullName: 'Maria Updated' };
  //   const result = await service.update(1, updateCustomerDto);
  //   expect(result).toEqual({ id: 1, ...updateCustomerDto });
  //   expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  //   expect(mockRepository.merge).toHaveBeenCalledWith(mockCustomer, updateCustomerDto);
  //   expect(mockRepository.save).toHaveBeenCalledWith({ id: 1, ...updateCustomerDto });
  // });

  it('should throw NotFoundException if customer to update not found', async () => {
    const updateCustomerDto = { fullName: 'Maria Updated' };
    await expect(service.update(999, updateCustomerDto)).rejects.toThrow(NotFoundException);
  });

  // it('should remove a customer by ID', async () => {
  //   const result = await service.remove(1);
  //   expect(result).toEqual(mockCustomer);
  //   expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  //   expect(mockRepository.remove).toHaveBeenCalledWith(mockCustomer);
  // });

  it('should throw NotFoundException if customer to remove not found', async () => {
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
