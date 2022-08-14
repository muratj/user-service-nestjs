import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async saveUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(createUserDto);
    if (!user) throw new BadRequestException(`User was not created`);
    delete user.password;
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users) throw new BadRequestException(`No user found`);
    users.map((user) => delete user.password);
    return users;
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestException(`No user found with id: ${id}`);
    delete user.password;
    return user;
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async deleteUserById(id: number) {
    return await this.userRepository.delete(id);
  }
}
