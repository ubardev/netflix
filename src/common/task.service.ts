import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';

import { readdir, unlink } from 'fs/promises';
import { join, parse } from 'path';
import { Movie } from 'src/movie/entity/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  logEverySecond() {
    console.log('1초 마다 실행!');
  }

  //   @Cron('* * * * * *')
  async eraseOrphanFiles() {
    const files = await readdir(join(process.cwd(), 'public', 'temp'));

    const deleteFilesTargets = files.filter((file) => {
      const filename = parse(file).name;

      const split = filename.split('_');

      if (split.length !== 2) {
        return true;
      }

      try {
        const date = +new Date(parseInt(split[split.length - 1]));
        const aDayInMilSec = 24 * 60 * 60 * 1000;

        const now = +new Date();

        return now - date > aDayInMilSec;
      } catch (e) {
        return true;
      }
    });

    await Promise.all(
      deleteFilesTargets.map((x) =>
        unlink(join(process.cwd(), 'public', 'temp', x)),
      ),
    );
  }

  //   @Cron('0 * * * * *')
  async calculateMovieLikeCounts() {
    console.log('run');
    await this.movieRepository.query(
      `
        UPDATE movie m
        SET "likeCount" = (
            SELECT COUNT(*)
            FROM movie_user_like mul
            WHERE m.id = mul."movieId" AND mul."isLike" = true
        )
        `,
    );

    await this.movieRepository.query(
      `
          UPDATE movie m
          SET "dislikeCount" = (
              SELECT COUNT(*)
              FROM movie_user_like mul
              WHERE m.id = mul."movieId" AND mul."isLike" = false
          )
          `,
    );
  }

  @Cron('* * * * * *', {
    name: 'printer',
  })
  pirnter() {
    console.log('print every seconds');
  }

  @Cron('*/5 * * * * *')
  stopper() {
    console.log('---stopper run---');

    const job = this.schedulerRegistry.getCronJob('printer');

    // console.log('# Last Date');
    // console.log(job.lastDate());
    // console.log('# Next Date');
    // console.log(job.nextDate());
    console.log('# Next Dates');
    console.log(job.nextDates(5));

    if (job.running) {
      job.stop();
    } else {
      job.start();
    }
  }
}
