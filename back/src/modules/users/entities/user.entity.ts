import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class User {
  readonly id: string;

  name: string;
  email: string;
  cpf: string;
  phone: string;
  birth?: string;
  description?: string;
  account_type: boolean;
  // is_active?:     boolean
  avatar_url: string;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
  }

  readonly created_at: Date;
}
