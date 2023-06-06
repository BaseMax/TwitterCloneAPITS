import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import clientMessages from 'src/common/translation/fa';
import { User } from '@prisma/client';
import { UserInit } from 'src/auth/types/user-init.type';
import { UpdateDto } from './Dto/update-user.dto';
import { SignUpDto } from 'src/auth/Dto/user-signUp.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<UserInit[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<UserInit | undefined> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpException(
        clientMessages.auth.invalidCredentials,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async update(id: number, updateDto: UpdateDto) {
    const user = await this.findById(id);
    await this.checkUsernameExist(updateDto.username);
    return await this.userRepository.update(id, updateDto);
  }

  async checkUsernameExist(username: string) {
    const user = await this.userRepository.findByUsername(username);

    if (user) {
      throw new HttpException(
        clientMessages.auth.alreadyExists,
        HttpStatus.BAD_REQUEST,
      );
    }
    return false;
  }
}
