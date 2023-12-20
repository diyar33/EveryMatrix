import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UserPreferences } from './userPreferences.entity';
import { Categories } from '../movies/categories.entity';

@Entity()
export class PreferenceCategories extends BaseEntity {
  @ManyToOne(() => UserPreferences, {
    nullable: false,
  })
  userPreference: UserPreferences;

  @ManyToOne(() => Categories, {
    nullable: false,
  })
  category: Categories;

  @Column({
    type: 'varchar',
  })
  categoryId: string;
}
