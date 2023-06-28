import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AdvertPrismaRepository } from '../adverts/repositories/prisma/adverts.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CommentsRepository } from './repository/comments.repository';
import { CommentsPrismaRepository } from './repository/prisma/comments.prisma.repository';

@Module({
  imports: [AdvertPrismaRepository],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    PrismaService,
    {
      provide: CommentsRepository,
      useClass: CommentsPrismaRepository
    }
  ]
})
export class CommentsModule {}
