import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieDetail } from './movie-detail.entity';
import { BaseTable } from 'src/common/base-table.entity';
import { Director } from 'src/director/entity/director.entity';

/// ManyToOne Director -> 감독은 여러개의 영화를 마들 수 있음
/// OneToOne MovieDetail -> 영화는 하나의 상세 내용을 가질 수 있음
/// ManyToMany Genre -> 영화는 여러개의 장르를 가질 수 있고 장르는 여러개의 영화에 속할 수 있음

@Entity()
export class Movie extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  title: string;

  @Column()
  genre: string;

  @OneToOne(() => MovieDetail, (movieDetail) => movieDetail.movie, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  detail: MovieDetail;

  @ManyToOne(() => Director, (director) => director.id, {
    cascade: true,
    nullable: false,
  })
  director: Director;
}
