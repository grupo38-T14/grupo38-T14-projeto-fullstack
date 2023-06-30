import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './repository/comments.repository';
import { NotFoundException } from "@nestjs/common"
import { AdvertRepository } from '../adverts/repositories/advert.repository';

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

  async remove(id: string) {
    const comment = await this.commentsRepository.findOne(id)
    if (!comment) {
      throw new  NotFoundException("Comment not found")
    }
    return await this.commentsRepository.delete(id)
  }
}
