import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Categories } from './categories.entity';
import { MoviesMetadatas } from './moviesMetadatas.entity';

@Entity()
export class Movies extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Categories, {
    nullable: false,
  })
  category: Categories;

  @Column({ type: 'varchar' })
  categoryId: string;

  @Column({ type: 'text', nullable: true })
  tags: string;

  @Column({ type: 'float' })
  length: number;

  @Column({ nullable: true })
  released: Date;

  @Column({ nullable: true })
  available_until: Date;

  @OneToMany(() => MoviesMetadatas, (moviesMetadatas) => moviesMetadatas.movie)
  moviesMetadata: MoviesMetadatas[];
}
