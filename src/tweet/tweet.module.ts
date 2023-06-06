import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetRepository } from './tweet.repository';
import { TweetController } from './tweet.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  providers: [TweetService, TweetRepository],
  controllers: [TweetController],
})
export class TweetModule {}
