import { Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UserPreferences } from './userPreferences.entity';
import { UserMovies } from './userMovies.entity';

@Entity()
export class Users extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @OneToMany(() => UserMovies, (movies) => movies.user)
  favorite_movies: UserMovies[];

  @OneToOne(() => UserPreferences)
  @JoinColumn()
  userPreference: UserPreferences;
}
