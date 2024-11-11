import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('movie')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies(@Query('title') title?: string) {
    return this.appService.getManyMovies(title);
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    return this.appService.getMovieById(+id);
  }

  @Post()
  postMovie(@Body('title') title: string) {
    return this.appService.createMovie(title);
  }

  // @Patch(':id')
  // patchMovie(@Param('id') id: string, @Body('title') title: string) {
  //   const movie = this.movies.find((m) => m.id === +id);
  //
  //   if (!movie) {
  //     throw new NotFoundException('존재하지 않는 ID의 영화입니다!');
  //   }
  //
  //   Object.assign(movie, { title });
  //
  //   return movie;
  // }
  //
  // @Delete(':id')
  // deleteMovie(@Param('id') id: string) {
  //   const movieIndex = this.movies.findIndex((m) => m.id === +id);
  //
  //   if (movieIndex === -1) {
  //     throw new NotFoundException('존재하지 않는 ID의 영화입니다!');
  //   }
  //
  //   this.movies.splice(movieIndex, 1);
  //
  //   return id;
  // }
}
