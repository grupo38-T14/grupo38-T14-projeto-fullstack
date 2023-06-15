import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from '../users.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { Address } from 'src/modules/addresses/entities/address.entity';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, {
      ...createUserDto,
    });
    
    const address = new Address()
    Object.assign(address,{
      ...createUserDto.address
    })

    const newUser = await this.prisma.users.create({
      data: { ...user, address:{ create: {...address} } },
    });

    return plainToInstance(User, newUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.users.findMany({
      include: {
        address: true,
      },
    });

    return plainToInstance(User, users);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: { id },
      include: {
        adverts: true,
        address: true,
      },
    });
    return plainToInstance(User, user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });
    return user;
  }

  async findByCpf(cpf: string): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: { cpf },
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const address = new Address()
    Object.assign(address,{
      ...updateUserDto.address
    })

    const updatedUser = await this.prisma.users.update({
      where: { id },
      data: { ...updateUserDto, address: { create: {...address} }}
    });
    return plainToInstance(User, updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.users.delete({
      where: { id },
    });
  }
}
