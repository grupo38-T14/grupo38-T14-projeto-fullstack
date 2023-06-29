import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CommentsRepository } from './repository/comments.repository';
import { CommentsPrismaRepository } from './repository/prisma/comments.prisma.repository';
import { AdvertRepository } from '../adverts/repositories/advert.repository';
import { AdvertsService } from '../adverts/adverts.service';
import { AdvertPrismaRepository } from '../adverts/repositories/prisma/adverts.prisma.repository';

@Module({
  imports: [],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    AdvertsService,
    PrismaService,
    {
      provide: CommentsRepository,
      useClass: CommentsPrismaRepository,
    },
    {
      provide: AdvertRepository,
      useClass: AdvertPrismaRepository,
    },
  ],
})
export class CommentsModule {}
