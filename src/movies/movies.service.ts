import { Injectable } from '@nestjs/common';
import { Movies, PageMetaDto, PageOptionsDto } from '../../libs';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private readonly moviesRepository: Repository<Movies>,
  ) {}
  async getAll(pageOptionsDto: PageOptionsDto) {
    return await this.getMovies('', pageOptionsDto);
  }

  async getCategoryMovies(categoryId: string, pageOptionsDto: PageOptionsDto) {
    return await this.getMovies(
      {
        categoryId,
      },
      pageOptionsDto,
    );
  }

  async getTagMovies(tag: string, pageOptionsDto: PageOptionsDto) {
    return await this.getMovies(
      {
        tags: Like(`%${tag}%`),
      },
      pageOptionsDto,
    );
  }

  async getMovies(whereQuery, pageOptionsDto: PageOptionsDto) {
    const pageOptions = { ...new PageOptionsDto(), ...pageOptionsDto };
    const [movies, itemCount] = await this.moviesRepository.findAndCount({
      where: whereQuery,
      order: {
        id: pageOptions.order,
      },
      relations: ['moviesMetadata'],
      skip: pageOptions.take * (pageOptions.page - 1),
      take: pageOptions.take,
    });

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      itemCount,
      pageOptions,
    });

    return {
      message: 'SUCCESS',
      items: movies,
      pageMetaDto,
    };
  }
}
