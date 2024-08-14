import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from 'src/application/services/customers.service';
import { CreateCustomerDto } from 'src/interfaces/dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/interfaces/dto/update-customer.dto';
import { NotFoundException } from '@nestjs/common';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

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

  const mockCustomersService = {
    create: jest.fn(dto => Promise.resolve({ id: Date.now(), ...dto })),
    findAll: jest.fn(() => Promise.resolve([mockCustomer])),
    findOne: jest.fn(id => Promise.resolve(id === 1 ? mockCustomer : null)),
    update: jest.fn((id, dto) => Promise.resolve(id === 1 ? { id, ...dto } : null)),
    remove: jest.fn(id => Promise.resolve(id === 1 ? mockCustomer : null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: mockCustomersService,
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
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

    const result = await controller.create(createCustomerDto);
    expect(result).toEqual({ id: expect.any(Number), ...createCustomerDto });
    expect(service.create).toHaveBeenCalledWith(createCustomerDto);
  });

  it('should return all customers', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockCustomer]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a customer by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual(mockCustomer);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if customer not found by ID', async () => {
    await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a customer by ID', async () => {
    const updateCustomerDto: UpdateCustomerDto = { fullName: 'Maria Updated' };
    const result = await controller.update(1, updateCustomerDto);
    expect(result).toEqual({ id: 1, ...updateCustomerDto });
    expect(service.update).toHaveBeenCalledWith(1, updateCustomerDto);
  });

  it('should throw NotFoundException if customer to update not found', async () => {
    const updateCustomerDto: UpdateCustomerDto = { fullName: 'Maria Updated' };
    await expect(controller.update(999, updateCustomerDto)).rejects.toThrow(NotFoundException);
  });

  it('should remove a customer by ID', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if customer to remove not found', async () => {
    await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
  });
});
