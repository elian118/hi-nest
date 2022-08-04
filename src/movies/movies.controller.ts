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
  getOne(@Param('id') movieId: string) {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
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
