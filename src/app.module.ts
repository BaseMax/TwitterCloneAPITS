import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { TweetModule } from './tweet/tweet.module';
import { UserModule } from './user/user.module';
import { FollowingModule } from './following/following.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guards/at.guard';

@Module({
  imports: [AuthModule, TweetModule, UserModule, FollowingModule, PrismaModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
