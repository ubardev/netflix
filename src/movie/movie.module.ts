import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import { MovieDetail } from './entity/movie-detail.entity';
import { Director } from 'src/director/entity/director.entity';
import { Genre } from 'src/genre/entity/genre.entity';
import { CommonModule } from 'src/common/common.module';
import { MovieUserLike } from './entity/movie-user-like.entity';
import { User } from 'src/user/entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie,
      MovieDetail,
      MovieUserLike,
      Director,
      Genre,
      User,
    ]),
    CommonModule,
    CacheModule.register({
      ttl: 0,
    }),
    // MulterModule.register({
    //   storage: diskStorage({
    //     /// ......./Netflix/public/movie
    //     /// process.cwd() + '/public' + '/movie'
    //     /// process.cwd() + '\public' + '\movie'
    //     destination: join(process.cwd(), 'public', 'movie'),
    //     filename: (req, file, cb) => {
    //       const split = file.originalname.split('.');

    //       let extension = 'mp4';

    //       if (split.length > 1) {
    //         extension = split[split.length - 1];
    //       }

    //       cb(null, `${v4()}_${Date.now()}.${extension}`);
    //     },
    //   }),
    // }),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
