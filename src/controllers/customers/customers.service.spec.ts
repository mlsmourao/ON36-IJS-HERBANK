import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

describe('Testing CustomersService', () => {
  let service: CustomersService;
  let repository: Repository<Customer>;

  const mockRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(customer => ({
      id: Date.now(),
      ...customer,
    })),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
      if (id === 1) {
        return {  id, 
                  fullName: 'Maria',
                  birthDate: '',
                  cpf: '12345678900',
                  address: 'Rua Maia de Lacerda, 91',
                  phoneNumbers: [],
                  email: 'marialuiza@mail.com',
                  creditHistory: [],
                  accounts: [],
                  managerId: 1 };
                }
                return null;
              }),
    merge: jest.fn().mockImplementation((customer, dto) => ({
      ...customer,
      ...dto,
    })),
    remove: jest.fn().mockImplementation(customer => customer),
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
    const createCustomerDto: CreateCustomerDto = {
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
    expect(result).toEqual({
      id: expect.any(Number),
      ...createCustomerDto,
    });
    expect(repository.create).toHaveBeenCalledWith(createCustomerDto);
    expect(repository.save).toHaveBeenCalledWith(createCustomerDto);
  });

  it('should return all customers', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should return a customer by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
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
    });
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException if customer not found by ID', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
  });

  it('should update a customer by ID', async () => {
    const updateCustomerDto: UpdateCustomerDto = {
      fullName: 'Maria updated',
      birthDate: '',
      cpf: '12345678900',
      address: 'Rua Maia de Lacerda, 91',
      phoneNumbers: [],
      email: 'marialuiza@mail.com',
      creditHistory: [],
      accounts: [],
      managerId: 1
    };
    const result = await service.update(1, updateCustomerDto);

    const expectedResult = {
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
    }
    expect(result).toEqual(expectedResult);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should throw NotFoundException if customer to update not found', async () => {
    const updateCustomerDto = { fullName: 'Maria Updated' };
    await expect(service.update(999, updateCustomerDto)).rejects.toThrow(NotFoundException);
  });

  it('should remove a customer by ID', async () => {
    await service.remove(1);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.remove).toHaveBeenCalledWith({
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
    });
  });

  it('should throw NotFoundException if customer to remove not found', async () => {
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
