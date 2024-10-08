import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Public } from './passport/public';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) { }

  @UseGuards(LocalAuthGuard)
  @Public()
  @ResponseMessage("Login success")
  @Post('login')
  async profile(@Request() req) {
    return this.authsService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
