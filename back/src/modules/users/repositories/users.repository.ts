import { Prisma } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { PaginatedResult } from 'src/modules/adverts/providers/prisma/paginator';
import { Advert } from 'src/modules/adverts/entities/advert.entity';

export abstract class UsersRepository {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findUserAdverts({
    where,
    orderBy,
    page,
  }: {
    where?: Prisma.AddressWhereInput;
    orderBy?: Prisma.AddressOrderByWithRelationInput;
    page?: number;
  }): Promise<PaginatedResult<Advert[]>>;
  abstract findByEmail(email: string): Promise<User | undefined>;
  abstract findByCpf(cpf: string): Promise<User | undefined>;
  abstract findOne(id: string): Promise<User>;
  abstract update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  abstract updateToken(email: string, resetToken: string): Promise<void>;
  abstract updatePassword(id: string, password: string): Promise<void>;
  abstract findByToken(token: string): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract findUserBy(email?: string, cpf?: string): Promise<User>;
}
