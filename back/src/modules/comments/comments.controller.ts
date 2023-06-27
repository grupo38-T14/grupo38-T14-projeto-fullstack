import { Controller, Post, Body, Param, Delete, HttpCode, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';


@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
    create(
      @Body() createCommentDto:CreateCommentDto,
      @Param("id") advertId:string,
      @Request() req
    ) {
    return this.commentsService.create(advertId, req.user.id, createCommentDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
