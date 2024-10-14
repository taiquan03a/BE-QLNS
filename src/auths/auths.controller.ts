import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Request, Query } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Public } from './passport/public';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ResponseMessage } from 'src/decorator/customize';
import { ConfirmPassword } from './dto/resetPassword.dto';

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
  @Public()
  @Get("confirm")
  confirmToken(@Query('token') token: string) {
    console.log("token confirm->", token);
    return this.authsService.verifyToken(token);
  }
  @Public()
  @Post("resetPassword")
  reset(@Body() confirm: ConfirmPassword) {
    return this.authsService.resetPassword(confirm);
  }
}
