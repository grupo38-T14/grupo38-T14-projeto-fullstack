import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CommentsRepository } from './repository/comments.repository';
import { CommentsPrismaRepository } from './repository/prisma/comments.prisma.repository';
import { AdvertsModule } from '../adverts/adverts.module';
import { AdvertPrismaRepository } from '../adverts/repositories/prisma/adverts.prisma.repository';

@Module({
  imports: [AdvertsModule],
  controllers: [CommentsController],
  providers: [
    AdvertPrismaRepository,
    CommentsService,
    PrismaService,
    {
      provide: CommentsRepository,
      useClass: CommentsPrismaRepository,
    },
  ],
})
export class CommentsModule {}
