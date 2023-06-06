import { Module } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './startegies/atStartegy';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [
    JwtModule.register({ secret: process.env.SECRET_KEY }),

    PrismaModule,
  ],
  providers: [AuthService, AuthRepository, JwtStrategy, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
