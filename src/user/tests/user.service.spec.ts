import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserService } from '../user.service';
import { UserMockRepository } from './__mocks__/user.mock.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { userMockData } from './__mocks__/user.mock.data';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UserController', () => {
  let module: TestingModule;
  let service: UserService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserMockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('saveUser', () => {
    let dto: CreateUserDto;
    let user: User;

    beforeAll(() => {
      dto = {
        email: userMockData().email,
        password: userMockData().password,
        firstName: userMockData().firstName,
        lastName: userMockData().lastName,
      };
    });

    test('when saveUser method called', async () => {
      user = await service.saveUser(dto);
    });

    test('then saveUser should return User entity without password', () => {
      const expected = { id: 5, ...dto };
      delete expected.password;
      expect(user).toEqual(expected);
    });
  });

  describe('findAllUsers', () => {
    let users: User[];
    test('when findAllUsers method called', async () => {
      users = await service.findAllUsers();
    });
    test('then findAllUsers should return User array', () => {
      expect(users.length).toBeGreaterThan(0);
    });
    test("and array shouldn't contain passwords", () => {
      users.forEach((user) => {
        expect(user.password).toBeUndefined();
      });
    });
  });

  describe('findUserById', () => {
    let user: User;
    test('when findUserById is called', async () => {
      user = await service.findUserById(userMockData().id);
    });
    test('then findUserById should return User object', () => {
      const expected = { ...userMockData() };
      expected.id = user.id;
      delete expected.password;
      expect(user).toEqual(expected);
    });
    test("and User object shouldn't contain passwords", () => {
      expect(user.password).toBeUndefined();
    });
  });

  describe('updateUserById', () => {
    let response: any;
    let dto: UpdateUserDto;
    let actual: User;

    beforeAll(() => {
      actual = userMockData();
      dto = {
        firstName: 'JohnUpdated',
        lastName: 'DoeUpdated',
      };
    });
    test('when updateUserById is called', async () => {
      response = await service.updateUserById(actual.id, dto);
    });
    test('then validate response', () => {
      expect(response.affected).toEqual(1);
    });
  });

  describe('deleteUserById', () => {
    let response: any;

    test('when deleteUserById is called', async () => {
      response = await service.deleteUserById(userMockData().id);
    });
    test('then validate response', () => {
      expect(response.affected).toEqual(1);
    });
  });
});
