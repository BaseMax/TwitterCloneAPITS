import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TweetRepository } from './tweet.repository';
import { TweetInit } from './types/tweet-type';
import clientMessages from 'src/common/translation/fa';
import { CreateTweetDto } from './Dto/create-tweet.dto';

@Injectable()
export class TweetService {
  constructor(private readonly tweetRepository: TweetRepository) {}

  async findById(id: number): Promise<TweetInit | undefined> {
    const tweet = await this.tweetRepository.findById(id);
    if (!tweet) {
      throw new HttpException(
        clientMessages.tweet.notExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    return tweet;
  }

  async create(
    userId: number,
    createTweetDto: CreateTweetDto,
  ): Promise<TweetInit> {
    return await this.tweetRepository.create(userId, createTweetDto);
  }

  async getAll() {
    return await this.tweetRepository.findMany();
  }
}
