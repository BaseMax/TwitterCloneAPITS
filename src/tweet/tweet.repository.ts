import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TweetInit } from './types/tweet-type';
import { Tweet } from '@prisma/client';
import { CreateTweetDto } from './Dto/create-tweet.dto';
@Injectable()
export class TweetRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: number): Promise<TweetInit | undefined> {
    return this.prisma.tweet.findUnique({
      where: { id },
      select: {
        id: true,
        content: true,
        user: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    });
  }

  create(id, createTweetDto: CreateTweetDto): Promise<TweetInit> {
    return this.prisma.tweet.create({
      data: {
        userId: id,
        ...createTweetDto,
      },
      select: {
        id: true,
        content: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }
}
