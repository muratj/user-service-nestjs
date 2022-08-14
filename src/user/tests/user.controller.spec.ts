import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { userMockData } from './__mocks__/user.mock.data';
import { UserMockRepository } from './__mocks__/user.mock.repository';

describe('UserController', () => {
  let module: TestingModule;
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserMockRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    let user: User;
    let dto: CreateUserDto;

    beforeEach(() => {
      dto = {
        email: userMockData().email,
        password: userMockData().password,
        firstName: userMockData().firstName,
        lastName: userMockData().lastName,
      };
    });
    test('when createUser method called', async () => {
      user = await controller.createUser(dto);
    });
    test('and it should return saved User', () => {
      const id = user.id;
      const expected = { id, ...dto };
      delete expected.password;
      expect(user).toEqual(expected);
    });
    test("and it shouldn't return password", () => {
      expect(user.password).toBeUndefined();
    });
  });

  describe('getAllUsers', () => {
    let users: User[];
    test('when getAllUsers is called', async () => {
      users = await controller.getAllUsers();
    });
    test('then it returns all users', () => {
      expect(users.length).toEqual(2);
    });
    test("and it shouldn't contain any users passwords", () => {
      users.forEach((user) => {
        expect(user.password).toBeUndefined();
      });
    });
  });

  describe('getUserById', () => {
    let user: User;
    test('when getUserById is called', async () => {
      user = await controller.getUserById(userMockData().id);
    });
    test('then it returns user', () => {
      const expected = userMockData();
      expected.id = user.id;
      delete expected.password;
      expect(user).toEqual(expected);
    });
    test("and it shouldn't contain any user passwords", () => {
      expect(user.password).toBeUndefined();
    });
  });

  describe('updateUser', () => {
    let response: any;
    let dto: UpdateUserDto;
    beforeAll(() => {
      dto = {
        firstName: 'JohnUpdated',
        lastName: 'DoeUpdated',
      };
    });
    test('when updateUser is called', async () => {
      response = await controller.updateUser(userMockData().id, dto);
    });
    test('then validate response', () => {
      expect(response.affected).toEqual(1);
    });
  });

  describe('deleteUser', () => {
    let response;
    test('when deleteUser is called', async () => {
      response = await controller.deleteUser(userMockData().id);
    });
    test('then validate response', () => {
      expect(response.affected).toEqual(1);
    });
  });
});
