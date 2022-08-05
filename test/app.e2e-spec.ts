import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach: 메서드 테스트 때마다 전용 애플리케이션을 생성한다.
  // beforeAll: 테스트 전에 한 번 실행한다. -> e2e 테스트에 적합
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // main.ts 와 똑같게 파이프 입력 -> 테스트 환경에서도 앱 환경과 같게 사전에 transform 처리시킬 목적
    //  아래 코드를 입력하지 않을 경우, URL 파라미터를 string 외 다른 타입으로 자동 파싱하지 않아,
    //  실제 애플리케이션 실행 결과와 다른 테스트 결과가 나올 수 있다.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true, // 파라미터 문자열을 받아야할 타입으로 자동 변환 Ex) id: number
      }),
    );
    await app.init();
  });

  it('/ (GET) 200', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  it('/movies (GET) 200', () => {
    return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
  });

  it('/movies (POST) 201', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Test',
        year: 2000,
        genres: ['test'],
      })
      .expect(201);
  });
  it('/movies (POST) 400', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Test',
        year: 2000,
        genres: ['test'],
        other: 'thing',
      })
      .expect(400);
  }); // beforeAll() -> app.useGlobalPipes(new ValidationPipe({ ...forbidNonWhitelisted: true })) 필요

  it('/movies (DELETE) 404', () => {
    return request(app.getHttpServer()).delete('/movies').expect(404);
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    }); // beforeAll() -> app.useGlobalPipes(new ValidationPipe({ ...transform: true })) 필요
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    }); // beforeAll() -> app.useGlobalPipes(new ValidationPipe({ ...transform: true })) 필요
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'Updated Test',
        })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
