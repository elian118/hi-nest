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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies.';
  }

  // 쿼리스트링 방식
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We ar searching for a movie made after: ${searchingYear}.`;
  }

  // 파라미터 방식
  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `This will return one movie with id: ${movieId}.`;
  }

  @Post()
  create(@Body() movieData): string {
    console.log(movieData);
    return movieData;
  }

  @Delete(':id')
  remove(@Param('id') movieId: string): string {
    return `This will delete a movie with the id: ${movieId}.`;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
