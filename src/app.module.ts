import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app/app.controller';
// @Module 은 @Controller, @Service 및 참조 클래스(엔티티, DTO 포함)들을
// 타입으로도 인식 가능하도록 해준다. -> d.ts 자동 생성(nest 의존성 자동 주입)
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
