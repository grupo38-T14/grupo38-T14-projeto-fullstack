import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
        return await this.usersRepository.create(createUserDto)
    }

    async findAll() {
        return await this.usersRepository.findAll()
    }

    async findOne(id: string) {
        const user = await this.usersRepository.findOne(id)
        if(!user) {
            throw new NotFoundException("User not found")
        }
        plainToInstance(User, user)
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findOne(id)
        if(!user) {
            throw new NotFoundException("User not found")
        }
        return await this.usersRepository.update(id, updateUserDto)
    }

    async remove(id: string) {
        const user = await this.usersRepository.findOne(id)
        if(!user) {
            throw new NotFoundException("User not found")
        }
        await this.usersRepository.delete(id)
    }
}
