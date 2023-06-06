import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { GetCurrentUserId } from 'src/common/decorators';
import { CreateTweetDto } from './Dto/create-tweet.dto';
import { AtGuard } from 'src/auth/guards/at.guard';
import { UserService } from 'src/user/user.service';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.tweetService.findById(id);
  }

  @UseGuards(AtGuard)
  @Post('')
  async tweet(
    @GetCurrentUserId() userId: number,
    @Body() createTweetDto: CreateTweetDto,
  ) {
    return await this.tweetService.create(userId, createTweetDto);
  }

  @Get()
  async getAll() {
    return await this.tweetService.getAll();
  }
}
