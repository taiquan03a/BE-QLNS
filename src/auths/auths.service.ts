import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AuthsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }
  async signIn(email: string, password: string): Promise<any> {
    const check = await this.usersService.authSignIn(email, password);
    if (!check) throw new UnauthorizedException("Tài khoản mật khẩu không chính xác.");
    const payload = { email: email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async validateUser(username: string, password: string): Promise<User> {
    const user = this.usersService.findByEmailAndPassword(username, password);
    if (user == null) return null;
    return user;
  }
  async login(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
