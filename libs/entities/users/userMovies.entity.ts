import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Movies } from '../movies';
import { Users } from './users.entity';

@Entity()
export class UserMovies extends BaseEntity {
  @ManyToOne(() => Users, (users) => users.favorite_movies)
  user: Users;

  @ManyToOne(() => Movies, {
    nullable: false,
  })
  movie: Movies;

  @Column({
    type: 'varchar',
  })
  movieId: string;
}
