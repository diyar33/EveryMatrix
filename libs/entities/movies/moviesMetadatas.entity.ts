import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Movies } from './movies.entity';

@Entity()
export class MoviesMetadatas extends BaseEntity {
  @ManyToOne(() => Movies, (movie) => movie.moviesMetadata)
  movie: Movies;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  picture: string;
}
