import { randomUUID } from 'node:crypto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import { MailService } from 'src/utils/mail.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('Email already in use!');
    }

    const userCpf = await this.usersRepository.findByCpf(createUserDto.cpf);
    if (userCpf) {
      throw new ConflictException('CPF Unavailable!');
    }

    return await this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserAdvert(
    where?: Prisma.AdvertWhereInput,
    orderBy?: Prisma.UsersOrderByWithRelationInput,
    page?: number,
  ) {
    const advertList = await this.usersRepository.findUserAdverts({
      where,
      orderBy,
      page,
    });
    return advertList;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email) {
      const newEmail = await this.usersRepository.findByEmail(
        updateUserDto.email,
      );
      if (updateUserDto.email !== user.email && newEmail) {
        throw new ConflictException('Email already in use!');
      }
    }

    if (updateUserDto.cpf) {
      const newCpf = await this.usersRepository.findByCpf(updateUserDto.cpf);
      if (newCpf && updateUserDto.cpf !== user.cpf) {
        throw new ConflictException('CPF Unavailable!');
      }
    }
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.delete(id);
  }

  async sendEmailResetPassword(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = randomUUID();
    await this.usersRepository.updateToken(email, resetToken);

    const resetPasswordTemplate = this.mailService.resetPasswordTemplate(
      email,
      user.name,
      resetToken,
    );

    await this.mailService.sendEmail(resetPasswordTemplate);
  }

  async resetPassword(password: string, reset_token: string) {
    const user = await this.usersRepository.findByToken(reset_token);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.updatePassword(user.id, password);
  }

  async findUser(email: string, cpf: string) {
    const user = await this.usersRepository.findUserBy(email, cpf);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
