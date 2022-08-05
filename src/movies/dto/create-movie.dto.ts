import { IsNumber, IsOptional, IsString } from 'class-validator';
// 아래 DTO 를 반환타입을 설정한 메서드는 데코레이터(@)에 따라,
// 유효성 검사 및 미유효 요청에 대한 사전 정의된 예외처리를 자동 실행한다.
export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}

/*
{
  "hacked": "by me"
}

{
  "statusCode": 400,
  "message":[
    "property hacked should not exist", // forbidNonWhitelisted: true 일때 발생
    "title must be a string",
    "year must be a number conforming to the specified constraints",
    "each value in genres must be a string"
  ],
  "error": "Bad Request"
}
*/
