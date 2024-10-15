import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';
import { STATUS_CODES } from 'http';
import { ConfirmPassword } from './dto/resetPassword.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }
  async signIn(email: string, password: string): Promise<any> {
    const check = await this.usersService.authSignIn(email, password);
    if (!check) throw new BadRequestException();
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
  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.VALI_SECRET_KET });
      const { email, code } = decoded;
      const user: User = await this.usersService.findByEmail(email);
      if (user == null || code != user.otp) throw new NotFoundException('User or code fail.');
      return { message: 'Token is valid. Proceed to password reset.' };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException('Token has expired');
      } else {
        throw new BadRequestException('Invalid token');
      }
    }
  }
  async resetPassword(confirm: ConfirmPassword) {
    const decoded = this.jwtService.verify(confirm.token, { secret: process.env.VALI_SECRET_KET });
    const { email, code } = decoded;
    const user: User = await this.usersService.findByEmail(email);
    if (user == null) throw new NotFoundException("not found");
    if (user.status != null) throw new BadRequestException('acc is active');
    if (confirm.confirmPassword != confirm.password) throw new BadRequestException('acc is active')
    user.password = await bcrypt.hash(confirm.password, 10);
    user.status = 1;
    this.usersService.saveUser(user);
  }
}
