import { PrismaService } from "src/database/prisma.service";
import { UsersRepository } from "../users.repository";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../../entities/user.entity";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { plainToInstance } from "class-transformer";

export class UsersPrismaRepository implements UsersRepository {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User()
        Object.assign(user, {
            ...createUserDto
        })

        const newUser = await this.prisma.users.create({
            data: {
                ...user
            }
        })
        return plainToInstance(User, newUser)
    }

    async findAll(): Promise<User[]> {
        return await this.prisma.users.findMany({
            include: {
                address: true,
            }
        })
    }

    async findOne(id: string): Promise<User> {
        const user = await this.prisma.users.findUnique({
            where: { id },
            include: {
                address: true,
            }
        })
        return plainToInstance(User, user)
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.prisma.users.update({
            where: { id },
            data: { ...updateUserDto },
            include: {
                address: true,
            }
        })
        return plainToInstance(User, updatedUser)
    }

    async delete(id: string): Promise<void> {
        await this.prisma.users.delete({
            where: { id }
        })
    }
}
