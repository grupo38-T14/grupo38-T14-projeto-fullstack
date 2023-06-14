import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service'; //service do User, aguardar o Lucas completar a task
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const passwordMatch = await compare(password, user.password);
      if (passwordMatch) {
        return { id: user.id, email: user.email };
      }
    }
    return null;
  }

  async login(email: string) {
    const findUser = await this.userService.findByEmail(email);

    return {
      token: this.jwtService.sign({ email }, { subject: findUser.id }),
    };
  }
}
