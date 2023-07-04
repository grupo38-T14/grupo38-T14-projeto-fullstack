import { PrismaService } from "src/database/prisma.service";
import { CreateCommentDto } from "../../dto/create-comment.dto";
import { Comment } from "../../entities/comment.entity";
import { CommentsRepository } from "../comments.repository";
import { plainToInstance } from "class-transformer";
import { Injectable } from "@nestjs/common";
import { UpdateCommentDto } from "../../dto/update-comment.dto";


@Injectable()
export class CommentsPrismaRepository implements CommentsRepository {
  constructor(private prisma: PrismaService) {}
  
  async create(
    advertId: string,
    userId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const newComment = await this.prisma.comments.create({
      data: {
        comment: createCommentDto.comment,
        advert: {
          connect: { id: advertId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
    return plainToInstance(Comment, newComment);
  }

  async findAll(userId: string): Promise<Comment[]> {
    const comment = await this.prisma.comments.findMany({
      where: {userId},
      include: {
        user: {
          select: {name: true}
        }
      }
    })
    return plainToInstance(Comment, comment);
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.prisma.comments.findUnique({
      where: { id },
    });
    return plainToInstance(Comment, comment);
  }
  
  async update(commentaryId: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const updatedComment = await this.prisma.comments.update({
      where: { id: commentaryId },
      data: {...updateCommentDto}
    })
    return plainToInstance(Comment, updatedComment)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.comments.delete({
      where: { id },
    });
  }
}
