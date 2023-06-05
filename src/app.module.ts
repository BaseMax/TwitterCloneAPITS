import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TweetsModule } from './tweets/tweets.module';
import { UserModule } from './user/user.module';
import { FollowingModule } from './following/following.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, TweetsModule, UserModule, FollowingModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
