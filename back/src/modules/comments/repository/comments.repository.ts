import { CreateCommentDto } from "../dto/create-comment.dto";
import { Comment } from "../entities/comment.entity";

export abstract class CommentsRepository {
    abstract create(advert: string, userId: string, createCommentDto: CreateCommentDto): Promise<Comment>
    abstract findOne(id:string): Promise<Comment>
    abstract delete(id: string): Promise<void>
}