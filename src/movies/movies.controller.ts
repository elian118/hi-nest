import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // 쿼리스트링 방식
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We ar searching for a movie made after: ${searchingYear}.`;
  }

  // 파라미터 방식
  @Get(':id')
  getOne(@Param('id') movieId: number) {
    // 파라미터는 기본 string 타입이며, 아래처럼 컨트롤러에서 임의로 타입을 변경할 수 없다.
    //    @Param('id') movieId: number
    // 하지만, ValidationPipe({ ...transform: true }) 설정을 사용하면
    // 위 코드는 ValidationPipe 가 해당 파라미터 타입을 number 로 미리 바꿔 전달할 수 있게 한다.
    console.log(typeof movieId); // number
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}

/* test raw body data

1) post

{
  "title": "소드 아트 온라인",
  "year": 2019,
  "genres": ["action", "animation"]
}

2) update

{
  "year": 2022
}
*/

/*
nest 는 express 위에서 작동한다.
그래서 아래와 같이 express 에 직접 접근하는 방식도 가능하다.

@Get()
  getAll(@Req req @Res res): Movie[] {
    res.json()
    return this.moviesService.getAll();
  }

그러나, 위 방식은 nest 에서 fastify 프레임워크에 접근하고자 할 때 문제가 된다.

nest 는 express, fastify 두 개 프레임워크에서 동작하는데,
만약 nest 에서 @Req @Res 를 사용해 express 방식을 적용할 경우,
여기서 fastify 기능을 사용할 수 없기 때문이다.

fastify 는 express 를 개선해 더 빠르게 성능을 개선한 프레임워크다.
그래서 보통은 express 방식을 지양하고
nest 에서 fastify 방식을 사용하는 걸 택한다.

*/
