import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface Movie {
  id: number;
  title: string;
}

@Controller('movie')
export class AppController {
  private movies: Movie[] = [
    {
      id: 1,
      title: '해리포터',
    },
    {
      id: 2,
      title: '반지의 제왕',
    },
  ];
  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies() {
    return this.movies;
  }

  @Get(':id')
  getMovie() {
    return {
      id: 1,
      name: '해리포터',
      character: ['해리포터', '엠마왓슨'],
    };
  }

  @Post()
  postMovie() {
    return {
      id: 3,
      name: '어벤져스',
      character: ['아이언맨', '캡틴아메리카'],
    };
  }

  @Patch(':id')
  patchMovie() {
    return {
      id: 3,
      name: '어벤져스',
      character: ['아이언맨', '블랙위도우'],
    };
  }

  @Delete(':id')
  deleteMovie() {
    return {
      id: 3,
      name: '어벤져스',
      character: ['아이언맨', '블랙위도우'],
    };
  }
}
