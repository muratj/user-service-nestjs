import { User } from '../../../entities/user.entity';
import { userMockData } from './user.mock.data';

export class UserMockRepository {
  public async save(dto): Promise<User> {
    const id: number = parseInt((Math.random() * 100).toFixed());
    const user: User = { id, ...dto };
    return user;
  }

  public async find(): Promise<User[]> {
    const users: User[] = [userMockData(), userMockData()];
    return users;
  }

  public async findOne(id: any): Promise<User> {
    const user: User = userMockData();
    user.id = id.where.id;
    return user;
  }

  public async update(id, data: any): Promise<any> {
    return {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };
  }

  public async delete(id: number): Promise<any> {
    return {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };
  }
}
