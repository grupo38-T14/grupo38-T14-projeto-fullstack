import { CreateCommentDto } from "../dto/create-comment.dto";
import { UpdateCommentDto } from "../dto/update-comment.dto";
import { Comment } from "../entities/comment.entity";

export abstract class CommentsRepository {
    abstract create(advert: string, userId: string, createCommentDto: CreateCommentDto): Promise<Comment>
    abstract findOne(id:string): Promise<Comment>
    abstract findAll(userId:string): Promise<Comment[]>
    abstract update(
        commentaryId:string, updateCommentDto:UpdateCommentDto
    ): Promise<Comment>
    abstract delete(id: string): Promise<void>
}