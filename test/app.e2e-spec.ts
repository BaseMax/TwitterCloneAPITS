import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { async } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Hash } from 'src/common/Hash';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let hash: Hash = new Hash();
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
    const testUser = {
      name: 'test',
      email: 'test@gmail.com',
      username: 'test',
      password: await Hash.hash('password'),
    };
    await prisma.user.create({ data: { ...testUser } });
  });

  beforeAll(async () => {});
  afterAll(async () => {
    app.close();
  });

  describe('auth', () => {
    describe('register ', () => {
      it('register successfully', () => {
        const user = {
          name: 'ksda',
          email: 'khalvjai@gmail.com',
          username: 'khjaljhvai',
          password: 'klasda',
          passwordConfirm: 'klasda',
        };
        return request(app.getHttpServer())
          .post('/auth/register')
          .send(user)
          .expect(201);
      });

      it('already exists user', () => {
        const testUser = {
          email: 'test@gmail.com',

          password: 'password',
        };
        return request(app.getHttpServer())
          .post('/auth/register')
          .send(testUser)
          .expect(400);
      });
    });

    describe('login', () => {
      it('login successfully', () => {
        const testUser = {
          name: 'test',
          email: 'test@gmail.com',
          username: 'test',
          password: 'password',
        };
        return request(app.getHttpServer())
          .post('/auth/login')
          .send(testUser)
          .expect(200);
      });

      it('invalid credentials', () => {
        const testUser = {
          email: 'test@gmail.com',

          password: 'invalid password',
        };
        return request(app.getHttpServer())
          .post('/auth/login')
          .send(testUser)
          .expect(400);
      });
    });
  });
});
