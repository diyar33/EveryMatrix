import { Injectable } from '@nestjs/common';
import { PageMetaDto, PageOptionsDto, Users } from '../../libs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async getAll(pageOptionsDto: PageOptionsDto) {
    const pageOptions = { ...new PageOptionsDto(), ...pageOptionsDto };
    const [users, itemCount] = await this.usersRepository.findAndCount({
      relations: [
        'userPreference',
        'userPreference.favorite_categories',
        'userPreference.favorite_categories.category',
      ],
      order: {
        id: pageOptions.order,
      },
      skip: pageOptions.take * (pageOptions.page - 1),
      take: pageOptions.take,
    });

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      itemCount,
      pageOptions,
    });

    return {
      message: 'SUCCESS',
      items: users,
      pageMetaDto,
    };
  }

  async getUserDetail(userId: string, pageOptionsDto: PageOptionsDto) {
    const pageOptions = { ...new PageOptionsDto(), ...pageOptionsDto };
    const [users, itemCount] = await this.usersRepository.findAndCount({
      where: {
        id: userId,
      },
      relations: ['userPreference', 'favorite_movies', 'favorite_movies.movie'],
      order: {
        id: pageOptions.order,
      },
      skip: pageOptions.take * (pageOptions.page - 1),
      take: pageOptions.take,
    });

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      itemCount,
      pageOptions,
    });

    return {
      message: 'SUCCESS',
      items: users,
      pageMetaDto,
    };
  }
}
