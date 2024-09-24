import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthsService } from '../auths.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthsService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        if (username === '' || password === '') throw new UnauthorizedException("Email và password không được để trống.")
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new BadRequestException("Tài khoản mật khẩu không chính xác.");
        }
        return user;
    }
}