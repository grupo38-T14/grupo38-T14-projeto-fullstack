import { Address } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class User {
  readonly id: string;
  readonly created_at: string;

  name: string;
  email: string;
  cpf: string;
  phone: string;
  birth: string;
  description: string;
  account_type: boolean;
  is_active?: boolean;
  avatar_url: string;
  address?: Address;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
    this.created_at = new Date().toISOString();
  }
}
