import { Controller, Post, Body, Param, Delete, HttpCode, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';


@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(":id")
    create(
      @Body() createCommentDto:CreateCommentDto,
      @Param("id") advertId:string,
      @Request() req
    ) {
    return this.commentsService.create(advertId, req.user.id, createCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
