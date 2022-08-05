import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 전역 유효성 검사 방법으로 ValidationPipe 적용
  // 라이브러리 설치 필요 -> npm i class-validator class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터 필드만 검사 후 통과시킨다. 나머지 필드는 객체에서 자동 삭제
      forbidNonWhitelisted: true, // 미 데코레이터 필드 관련 요청에 대해 예외를 발생시킴
      transform: true, // 파라미터 문자열을 받아야할 타입으로 자동 변환 Ex) id: number
    }),
  );
  await app.listen(3000);
}
bootstrap();
