import { User } from '../../../entities/user.entity';

export const userMockData = (): User => {
  return {
    id: parseInt((Math.random() * 100).toFixed()),
    email: 'john.doe@gmail.com',
    password: 'Password1',
    firstName: 'John',
    lastName: 'Doe',
  };
};
