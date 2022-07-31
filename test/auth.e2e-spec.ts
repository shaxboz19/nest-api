import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const LoginDto: AuthDto = {
  login: 'test@mail.ru',
  password: '1234567',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .expect(200)
      .send(LoginDto)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
      });
  });
  it('/auth/login (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .expect(401, {
        statusCode: 401,
        message: 'Неправильный пароль',
        error: 'Unauthorized',
      })
      .send({ ...LoginDto, password: '1' });
  });
  it('/auth/login (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .expect(401, {
        statusCode: 401,
        message: 'Пользователь с таким email не найден',
        error: 'Unauthorized',
      })
      .send({ ...LoginDto, login: 'sdlasdsalkdklsd@mil.ru' });
  });

  afterAll(() => {
    disconnect();
  });
});
