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
