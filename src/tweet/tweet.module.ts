import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetRepository } from './tweet.repository';
import { TweetController } from './tweet.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TweetService, TweetRepository],
  controllers: [TweetController],
})
export class TweetModule {}
