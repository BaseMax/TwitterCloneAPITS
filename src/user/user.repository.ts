import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from 'src/auth/Dto/user-signUp.dto';
import { User } from '@prisma/client';
import { UserInit } from 'src/auth/types/user-init.type';
import { UpdateDto } from './Dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(signUpDto: SignUpDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: signUpDto.name,
        email: signUpDto.email,
        username: signUpDto.username,
        password: signUpDto.password,
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
      },
    });
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  findByUsername(userName: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        username: userName,
      },
    });
  }

  find(): Promise<UserInit[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  update(id: number, updateDto: UpdateDto) {
    return this.prisma.user.update({
      data: { ...updateDto, updateAt: new Date().toISOString() },
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }
  findById(id: number): Promise<UserInit | undefined> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
      },
    });
  }
}
