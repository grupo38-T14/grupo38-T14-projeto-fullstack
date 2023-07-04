import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Request,
  UseGuards,
  Get,
  Patch,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags("Comments")
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(
    @Body() createCommentDto:CreateCommentDto,
    @Param("id") advertId:string,
    @Request() req
  ) {
    return this.commentsService.create(advertId, req.user.id, createCommentDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Body() updateCommentDto:UpdateCommentDto,
    @Param("id") advertId:string,
    @Request() req
  ) {
    return this.commentsService.update(advertId, req.user.id, updateCommentDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("")
  findAll(@Request() req) {
    return this.commentsService.findAll(req.user.id)
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') commentaryId: string, @Request() req) {
    return this.commentsService.remove(commentaryId, req.user.id);
  }
}
