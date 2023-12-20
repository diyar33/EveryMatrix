import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '../../libs';
import { MoviesService } from './movies.service';

@Controller('movies')
@ApiTags('Movies')
@Controller('movie')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  async getAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.moviesService.getAll(pageOptionsDto);
  }
  @Get('/category/:categoryId')
  async getCategoryMovies(
    @Param('categoryId') categoryId: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return await this.moviesService.getCategoryMovies(
      categoryId,
      pageOptionsDto,
    );
  }
  @Get('tags/:tag')
  async getTagMovies(
    @Param('tag') tag: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return await this.moviesService.getTagMovies(tag, pageOptionsDto);
  }
}
