import { User } from '../users/entities/user.entity';
import { Request } from 'express';

export interface AuthRequest extends Request {
  client: User;
}
