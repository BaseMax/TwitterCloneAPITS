import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CookieOptions, Request, Response } from 'express';

import { AuthService } from './auth.service';

import { UserLoginDto } from './Dto/user-login.Dto';
import { SignUpDto } from './Dto/user-signUp.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly atExp = 15 * 60 * 1000; // access token expiration time 15m
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signup(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {

    const user = await this.authService.signUp(signUpDto);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.email,
      },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() userLogInDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.logIn(userLogInDto);
  }

  @Post('logout/:id')
  async logout(@Param('id', ParseIntPipe) id: number) {
    const isLoggedOut = await this.authService.logOut(id);

    return 'logged out';
  }
}
