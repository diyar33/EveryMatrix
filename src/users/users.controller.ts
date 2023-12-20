import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { PageOptionsDto } from '../../libs';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.usersService.getAll(pageOptionsDto);
  }
  @Get('/:userId')
  async getUserDetail(
    @Param('userId') userId: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return await this.usersService.getUserDetail(userId, pageOptionsDto);
  }
}
