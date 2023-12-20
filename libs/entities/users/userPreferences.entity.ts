import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { PreferenceCategories } from './preferenceCategories.entity';

@Entity()
export class UserPreferences extends BaseEntity {
  @OneToMany(
    () => PreferenceCategories,
    (categories) => categories.userPreference,
  )
  favorite_categories: PreferenceCategories[];

  @Column({ type: 'varchar', nullable: true })
  website_theme: string;
}
