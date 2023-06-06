import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Hash } from 'src/common/Hash';
import { UserLoginDto } from './Dto/user-login.Dto';
import { SignUpDto } from './Dto/user-signUp.dto';
import { AuthRepository } from './auth.repository';
import { JwtPayload } from './types/jwtPayload.type';
import { Tokens } from './types/tokens.type';
import clientMessages from 'src/common/translation/fa';
import { UserRepository } from '../user/user.repository';
import { UserService } from 'src/user/user.service';
import { UserInit } from './types/user-init.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async logIn(userLogInDto: UserLoginDto) {
    const user = await this.userRepository.findByEmail(userLogInDto.email);
    if (!user) {
      throw new BadRequestException(clientMessages.auth.invalidCredentials);
    }


    const isPasswordValid = await Hash.compare(
      userLogInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException(clientMessages.auth.invalidCredentials);
    }

    const token = await this.getToken({
      sub: user.id,
      username: user.username,
    });
    return {
      accessToken: token.accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async signUp(signUPDto: SignUpDto): Promise<UserInit> {
    await this.checkEmailExist(signUPDto.email);
    await this.checkUsernameExist(signUPDto.username);

    const hashedPassword = await Hash.hash(signUPDto.password);

    const user = await this.userRepository.create({
      email: signUPDto.email,
      name: signUPDto.name,
      password: hashedPassword,
      username: signUPDto.username,
      passwordConfirm: signUPDto.passwordConfirm,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  async logOut(userId: number) {
    return true;
  }

  async getToken(jwtPayload: JwtPayload): Promise<Tokens> {
    const secretKey = process.env.SECRET_KEY;
    const accessTokenOptions = { expiresIn: '15m' };

    const accessToken = await this.signToken(
      jwtPayload,
      secretKey,
      accessTokenOptions,
    );

    return { accessToken: accessToken };
  }

  async signToken(payload: JwtPayload, secretKey: string, options: any) {
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      ...options,
    });
  }

  async checkEmailExist(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new HttpException(
        clientMessages.auth.alreadyExists,
        HttpStatus.BAD_REQUEST,
      );
    }
    return false;
  }
  async checkUsernameExist(email: string) {
    const user = await this.userRepository.findByUsername(email);

    if (user) {
      throw new HttpException(
        clientMessages.auth.alreadyExists,
        HttpStatus.BAD_REQUEST,
      );
    }
    return false;
  }
}
