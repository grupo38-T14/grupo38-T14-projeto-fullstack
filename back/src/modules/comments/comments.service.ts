import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './repository/comments.repository';
import { NotFoundException } from "@nestjs/common"
import { AdvertRepository } from '../adverts/repositories/advert.repository';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: CommentsRepository,
    private advertPrismaRepository: AdvertRepository
  ) {}

  async create(advertId: string, userId: string, createCommentDto: CreateCommentDto) {
    const advert = await this.advertPrismaRepository.findOne(advertId)
    if(!advert) {
      throw new  NotFoundException("Advert not found")
    }
    return await this.commentsRepository.create(advertId, userId, createCommentDto)
  }

  async findAll(userId:string) {
    return await this.commentsRepository.findAll(userId)
  }

  async update(commentaryId: string, userId:string, updateCommentDto:UpdateCommentDto ) {
    const comment = await this.commentsRepository.findOne(commentaryId)
    if (!comment) {
      throw new  NotFoundException("Comment not found")
    }
    if (comment.userId !== userId) {
      throw new  NotFoundException("This Comment doesn't belong to you")
    }
    return await this.commentsRepository.update(commentaryId, updateCommentDto)
  }

  async remove(commentaryId: string, userId:string) {
    const comment = await this.commentsRepository.findOne(commentaryId)
    if (!comment) {
      throw new  NotFoundException("Comment not found")
    }
    if (comment.userId !== userId) {
      throw new  NotFoundException("This Comment doesn't belong to you")
    }
    return await this.commentsRepository.delete(commentaryId)
  }
}
